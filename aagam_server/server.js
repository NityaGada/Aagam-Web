const express = require("express");
const cors = require("cors");
const pool = require("./database.js");

const app = express();

// app.use(express.json());
app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ extended: true, limit: '250mb' }));
app.use(cors());

// const mainimage = require('fs').readFileSync('C:/Users/Anant/Downloads/Aagam/Aagam-Web/aagam/src/assets/model.png');
// const handsfaceimage = require('fs').readFileSync('C:/Users/Anant/Downloads/Aagam/Aagam-Web/aagam/src/assets/face_and_hands.png');
// pool.query('INSERT INTO types (name, main_image, hands_and_face) VALUES ($1, $2, $3)', ['Kurta', mainimage, handsfaceimage], (error, results) => {
//     if (error) {
//         throw error;
//     }
//     console.log('Kurta inserted successfully');
// });

// const model = require('fs').readFileSync('C:/Users/Anant/Downloads/Aagam/Aagam-Web/aagam/src/assets/model copy.png');
// console.log(model);
// pool.query('INSERT INTO subtypes (name, subtype_name, subtypes_image, hands_and_face) VALUES ($1, $2, $3, $4)', ['Kurta', 'Type5', model, model], (error, results) => {
//     if (error) {
//         throw error;
//     }
//     console.log('Kurta5 inserted successfully');
// });

// const mainimage = require('fs').readFileSync('C:/Users/Anant/Downloads/Aagam/Aagam-Web/aagam/src/assets/yellow.JPG');
// pool.query('INSERT INTO patterns (name, pattern_image, length) VALUES ($1, $2, $3)', ['Yellow', mainimage, 20], (error, results) => {
//     if (error) {
//         throw error;
//     }
//     console.log('Yellow inserted successfully');
// });

app.post('/customizer', (request, response) => {
    const mainTypeName = request.body.mainTypeName;
    console.log(mainTypeName);
    const maintypesQuery = 'SELECT * FROM types WHERE name = $1';
    const subtypesQuery = 'SELECT * FROM subtypes WHERE name = $1';
    const patternQuery = 'SELECT name, pattern_image FROM patterns';

    pool.query(maintypesQuery, [mainTypeName], (maintypesError, maintypesResults) => {
        if (maintypesError) {
            throw maintypesError;
        }

        const maintypeData = {
            type_name: maintypesResults.name,
            main_image: maintypesResults.rows[0].main_image.toString('base64'),
            handsandface_image: maintypesResults.rows[0].hands_and_face.toString('base64'),
            subtypes: [],
            patterns: []
        };

        pool.query(subtypesQuery, [mainTypeName], (subtypesError, subtypesResults) => {
            if (subtypesError) {
                throw subtypesError;
            }

            subtypesResults.rows.forEach(subtypeRow => {
                const subtypeData = {
                    subtype_name: subtypeRow.subtype_name,
                    subtype_image: subtypeRow.subtypes_image.toString('base64'),
                    subtype_handsandface_image: subtypeRow.hands_and_face.toString('base64')
                };
                maintypeData.subtypes.push(subtypeData);
            });

            pool.query(patternQuery, (patternsError, patternsResults) => {
                if (patternsError) {
                    throw patternsError;
                }

                patternsResults.rows.forEach(patternRow => {
                    const patternData = {
                        name: patternRow.name,
                        patterns_image: patternRow.pattern_image.toString('base64')
                    };
                    maintypeData.patterns.push(patternData);
                });

                response.json(maintypeData);
            });
        });
    });
});

// const title = request.query.title;
// const selectStatement = 'SELECT subtype_name, subtypes_image FROM subtypes WHERE name = $1';
// const selectStatement2 = 'SELECT main_image FROM types WHERE name = $1';
// const values = [title];

// pool.query(selectStatement, values, (sql_error, sql_results) => {
//     if (sql_error) {
//         throw sql_error;
//     }

//     const subtypes = sql_results.rows.map(row => ({
//         name: row.subtype_name,
//         image: row.subtypes_image.toString('base64')
//     }));

//     pool.query(selectStatement2, values, (sql_error2, sql_results2) => {
//         if (sql_error2) {
//             throw sql_error2;
//         }

//         const mainImage = sql_results2.rows.map(row => ({
//             name: title,
//             image: row.main_image.toString('base64')
//         }));

//         const responseData = [...subtypes];
//         response.json(responseData);
//     });
// });
// });

app.post('/admin', (request, response) => {
    const maintypesQuery = 'SELECT name, main_image FROM types';
    const subtypesQuery = 'SELECT name, subtype_name, subtypes_image FROM subtypes';
    const responseData = [];

    pool.query(maintypesQuery, (maintypesError, maintypesResults) => {
        if (maintypesError) {
            throw maintypesError;
        }
        maintypesResults.rows.forEach(maintypeRow => {
            const maintypeData = {
                name: maintypeRow.name,
                main_image: maintypeRow.main_image.toString('base64'),
                subtype_names: [],
                subtype_images: []
            };

            pool.query(subtypesQuery, (subtypesError, subtypesResults) => {
                if (subtypesError) {
                    throw subtypesError;
                }

                subtypesResults.rows.forEach(subtypeRow => {
                    if (subtypeRow.name === maintypeRow.name) {
                        maintypeData.subtype_names.push(subtypeRow.subtype_name);
                        const image_data = subtypeRow.subtypes_image.toString('base64');
                        maintypeData.subtype_images.push(image_data);
                    }
                });

                responseData.push(maintypeData);
                if (responseData.length === maintypesResults.rows.length) {
                    response.json(responseData);
                }
            });
        });
    });
});

app.post('/admin/add_type', (request, response) => {
    const name = request.body["name"];
    const main_image = Buffer.from(request.body["main_image"], 'base64');
    const hands_and_face = Buffer.from(request.body["hands_and_face"], 'base64');
    pool.query('INSERT INTO types (name, main_image, hands_and_face) VALUES ($1, $2, $3)', [name, main_image, hands_and_face], (error, results) => {
        if (error) {
            throw error;
        }
    })
    response.status(200).send('Addition successful');
});

app.post('/admin/add_subtype', (request, response) => {
    const name = request.body["name"];
    const subtype_name = request.body["subtype_name"];
    const subtypes_image = Buffer.from(request.body["subtypes_image"], 'base64');
    const hands_and_face = Buffer.from(request.body["hands_and_face"], 'base64');
    pool.query('INSERT INTO subtypes (name, subtype_name, subtypes_image, hands_and_face) VALUES ($1, $2, $3, $4)', [name, subtype_name, subtypes_image, hands_and_face], (error, results) => {
        if (error) {
            throw error;
        }
    })
    response.status(200).send('Addition successful');
});

app.post('/admin/edit_subtype', (request, response) => {
    const name = request.body["name"];
    const index = request.body["index"];
    const type_list = request.body["type_list"];
    console.log(type_list, index);
    const old_subtype_name = type_list[index];
    console.log(old_subtype_name);
    const subtype_name = request.body["subtype_name"];
    const subtypes_image = Buffer.from(request.body["subtypes_image"], 'base64');
    const hands_and_face = Buffer.from(request.body["hands_and_face"], 'base64');
    pool.query('UPDATE subtypes SET subtype_name=$1, subtypes_image=$2, hands_and_face=$3 WHERE name=$4 and subtype_name=$5;', [subtype_name, subtypes_image, hands_and_face, name, old_subtype_name], (error, results) => {
        if (error) {
            throw error;
        }
    })
    response.status(200).send('Addition successful');
});

app.post('/admin/delete_design', async (request, response) => {
    const name = request.body["name"];
    const index = request.body["index"];
    const type_list = request.body["type_list"];
    try {
        if (index === -1) {
            const deleteSubtypesQuery = 'DELETE FROM subtypes WHERE name = $1';
            const deleteTypesQuery = 'DELETE FROM types WHERE name = $1';

            await pool.query(deleteSubtypesQuery, [name]);
            await pool.query(deleteTypesQuery, [name]);
        } else {
            const subtypeName = type_list[index];
            const deleteSubtypesQuery = 'DELETE FROM subtypes WHERE name = $1 AND subtype_name = $2';

            await pool.query(deleteSubtypesQuery, [name, subtypeName]);
        }

        response.status(200).send('Deletion successful');
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});

app.post('/adminpattern', (request, response) => {
    const maintypesQuery = 'SELECT * FROM patterns';
    const responseData = [];

    pool.query(maintypesQuery, (maintypesError, maintypesResults) => {
        if (maintypesError) {
            throw maintypesError;
        }
        maintypesResults.rows.forEach(maintypeRow => {
            const maintypeData = {
                name: maintypeRow.name,
                patterns_image: maintypeRow.pattern_image.toString('base64'),
                length: maintypeRow.length
            };
            responseData.push(maintypeData);
            if (responseData.length === maintypesResults.rows.length) {
                response.json(responseData);
            }
        });
    })
});

app.post('/adminpattern/add', (request, response) => {
    console.log(request.body);
    const name = request.body["name"];
    const buffer_image = Buffer.from(request.body["pattern_image"], 'base64');
    const length = request.body["length"];
    
    // const canvas = createCanvas(10, 10);
    // const ctx = canvas.getContext('2d');
    // loadImage(buffer_image).then(img => {
    //     const aspect = img.width / img.height;
    //     canvas.width = 10;
    //     canvas.height = 10 / aspect;
    //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //     const pixels = imageData.data;
    //     const converted_image = Array.from(pixels);
    //     const converted_buffer_image = Buffer.from(converted_image, 'base64');
        
        pool.query('INSERT INTO patterns (name, pattern_image, length) VALUES ($1, $2, $3)', [name, buffer_image, length], (error, results) => {
            if (error) {
                throw error;
            }
        })
    // });
    response.status(200).send('Addition successful');
});

app.post('/adminpattern/delete', async (request, response) => {
    const name = request.body["name"];
    const length = request.body["length"];
    const deletePatternQuery = 'DELETE FROM patterns WHERE name = $1 AND length = $2';
    pool.query(deletePatternQuery, [name, length], (error, results) => {
        if (error) {
            throw error;
        }
    })
    response.status(200).send('Deletion successful');
});

app.listen(4000, () => console.log("Server on port 4000"));
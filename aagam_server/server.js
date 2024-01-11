const express = require("express");
const cors = require("cors");
const pool = require("./database.js");

const app = express();

app.use(express.json());
app.use(cors());

// const model = require('fs').readFileSync('C:/Users/Anant/Downloads/Aagam/Aagam-Web/aagam/src/assets/model copy.png');
// pool.query('INSERT INTO subtypes (name, subtype_name, subtypes_image, hands_and_face) VALUES ($1, $2, $3, $4)', ['Nawabi', 'Type6', model, model], (error, results) => {
//     if (error) {
//         throw error;
//     }
//     console.log('Nawabi6 inserted successfully');
// });

app.get('/customizer', (request, response) => {
    const title = request.query.title;
    const selectStatement = 'SELECT subtype_name, subtypes_image FROM subtypes WHERE name = $1';
    const selectStatement2 = 'SELECT main_image FROM types WHERE name = $1';
    const values = [title];

    pool.query(selectStatement, values, (sql_error, sql_results) => {
        if (sql_error) {
            throw sql_error;
        }

        const subtypes = sql_results.rows.map(row => ({
            name: row.subtype_name,
            image: row.subtypes_image.toString('base64')
        }));

        pool.query(selectStatement2, values, (sql_error2, sql_results2) => {
            if (sql_error2) {
                throw sql_error2;
            }

            const mainImage = sql_results2.rows.map(row => ({
                name: title,
                image: row.main_image.toString('base64')
            }));

            const responseData = [...subtypes];
            response.json(responseData);
        });
    });
});

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

app.post('/admin/add'), (request, ressponse) => {
    const name = request.body["name"];
    const subtype_name = request.body["subtype_name"];
    const subtypes_image = request.body["subtypes_image"];
    const hands_and_face = request.body["hands_and_face"];
    console.log(subtypes_image);
    console.log(hands_and_face);
    pool.query('INSERT INTO subtypes (name, subtype_name, subtypes_image, hands_and_face) VALUES ($1, $2, $3, $4)', [name, subtype_name, subtypes_image, hands_and_face], (error, results) => {
        if (error) {
            throw error;
        }
        console.log('Nawabi1 inserted successfully');
    });
}

app.post('/admin/delete', async (request, response) => {
    const name = request.body["name"];
    const index = request.body["index"];

    try {
        if (index === -1) {
            const deleteSubtypesQuery = 'DELETE FROM subtypes WHERE name = $1';
            const deleteTypesQuery = 'DELETE FROM types WHERE name = $1';

            await pool.query(deleteSubtypesQuery, [name]);
            await pool.query(deleteTypesQuery, [name]);
        } else {
            const subtypeName = `Type${index + 1}`;
            const deleteSubtypesQuery = 'DELETE FROM subtypes WHERE name = $1 AND subtype_name = $2';

            await pool.query(deleteSubtypesQuery, [name, subtypeName]);
        }

        response.status(200).send('Deletion successful');
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
});

app.listen(4000, () => console.log("Server on port 4000"));
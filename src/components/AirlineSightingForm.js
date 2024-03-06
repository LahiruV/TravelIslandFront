import React, { useState } from 'react';
import { Typography, Button, TextField, Grid, Card, CardContent, Input, InputLabel } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddAirlineSightingForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        shortName: '',
        airlineCode: '',
        location: '',
        createdUserId: '',
        image: ''
    });
    const [imageSelected, setImageSelected] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files[0]) {
            setImageSelected(files[0]);
            setFormData(prevState => ({
                ...prevState,
                image: files[0].name,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const imgData = new FormData();
        imgData.append("file", imageSelected);
        imgData.append("upload_preset", "ml_default");

        try {
            await axios.post(
                "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
                imgData
            );

            const response = await axios.post('https://localhost:44389/api/AirlineSighting/Add', formData);
            await Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            onAdd();
        } catch (error) {
            console.error('Error adding sighting: ', error);
            await Swal.fire({
                title: "Error!",
                text: error.data.message,
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
        }
    };

    return (
        <Card sx={{ padding: 2, boxShadow: 4, border: '1px solid #ccc' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom align="center" >Add Airline Sighting</Typography>
                <form onSubmit={handleAdd}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={4} md={8}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                inputProps={{ maxLength: 150 }}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Short Name"
                                name="shortName"
                                value={formData.shortName}
                                onChange={handleChange}
                                required
                                inputProps={{ maxLength: 5 }}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Airline Code (Format: XXX-####)"
                                name="airlineCode"
                                value={formData.airlineCode}
                                onChange={handleChange}
                                required
                                inputProps={{ pattern: '^[A-Z]{3}-\\d{4}$' }}
                                margin="normal"
                            />
                            <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
                            <Input
                                type="file"
                                id="image-upload"
                                name="image"
                                onChange={handleChange}
                                accept="image/*"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                inputProps={{ maxLength: 200 }}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Created User ID"
                                name="createdUserId"
                                type="number"
                                value={formData.createdUserId}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '20px' }}
                            >
                                Add AirlineSighting
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddAirlineSightingForm;

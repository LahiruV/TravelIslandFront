import React from 'react';
import { Modal, Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const EditModal = ({ isOpen, onClose, onSubmit, formData, handleChange, handleCheckboxChange }) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h5" gutterBottom align="center">Edit Airline Sighting</Typography>
                <form onSubmit={onSubmit}>
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
                        label="Modified User ID"
                        name="modifiedUserId"
                        type="number"
                        value={formData.modifiedUserId}
                        onChange={handleChange}
                        required
                        margin="normal"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.isActive} onChange={handleCheckboxChange} name="isActive" />}
                        label="Is Active"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.isDeleted} onChange={handleCheckboxChange} name="isDeleted" />}
                        label="Is Deleted"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>Save Changes</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default EditModal;

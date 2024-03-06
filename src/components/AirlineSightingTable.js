import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AirlineSightingTable = ({ sightings, onDelete, onEdit }) => {
    return (
        <TableContainer component={Paper} elevation={3}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Short Name</TableCell>
                        <TableCell>Airline Code</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Created Date Time</TableCell>
                        <TableCell>IsActive</TableCell>
                        <TableCell>IsDeleted</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>CreatedUserId</TableCell>
                        <TableCell>ModifiedUserId</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sightings.map(sighting => (
                        <TableRow key={sighting.id}>
                            <TableCell>{sighting.name}</TableCell>
                            <TableCell>{sighting.shortName}</TableCell>
                            <TableCell>{sighting.airlineCode}</TableCell>
                            <TableCell>{sighting.location}</TableCell>
                            <TableCell>{sighting.createdDateTime}</TableCell>
                            <TableCell>{sighting.isActive ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{sighting.isDeleted ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                {sighting.image && <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + sighting.image} alt="Airline Sighting" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                            </TableCell>
                            <TableCell>{sighting.createdUserId}</TableCell>
                            <TableCell>{sighting.modifiedUserId}</TableCell>
                            <TableCell>
                                <IconButton color="primary" aria-label="edit" onClick={() => onEdit(sighting)}>
                                    <EditIcon />
                                </IconButton>
                                {sighting.isDeleted === true && (
                                    <IconButton color="error" aria-label="delete" onClick={() => onDelete(sighting.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AirlineSightingTable;

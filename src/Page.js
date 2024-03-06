// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Button, TextField, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Input, InputLabel, InputAdornment } from '@mui/material';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditModal from './EditModal';

// const AirlineSightingApp = () => {
//     const [sightings, setSightings] = useState([]);
//     const [imageSelected, setImageSelected] = useState(null);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [search, setSearch] = useState('');
//     const [formData, setFormData] = useState({
//         name: '',
//         shortName: '',
//         airlineCode: '',
//         location: '',
//         createdUserId: '',
//         image: ''
//     });
//     const [editformData, setEditFormData] = useState({
//         id: 0,
//         name: String,
//         shortName: String,
//         airlineCode: String,
//         location: String,
//         CreatedDateTime: '',
//         modifiedUserId: 0,
//         CreatedUserId: 0,
//         isActive: Boolean,
//         isDeleted: Boolean,
//         image: String
//     });

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         if (search === "") {
//             window.location.href = "/";
//         }
//         else {
//             try {
//                 const response = await axios.get(`https://localhost:44389/api/AirlineSighting/Get/${search}`);
//                 setSightings(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching data: ', error);
//             }
//         }
//     }

//     const handleEditModalOpen = (sighting) => {
//         setEditFormData(sighting);
//         setIsEditModalOpen(true);
//     };

//     const handleEditModalClose = () => {
//         setIsEditModalOpen(false);
//     };

//     const handleEditSubmit = async () => {
//         try {
//             await axios.put(`https://localhost:44389/api/AirlineSighting/Update`, editformData);
//             setIsEditModalOpen(false);
//             window.location.href = "/";
//         } catch (error) {
//             console.error('Error updating sighting: ', error);
//             await Swal.fire({
//                 title: "Error!",
//                 text: error.response.data.message,
//                 icon: 'error',
//                 confirmButtonText: "OK",
//                 type: "success"
//             });
//             window.location.href = "/";
//         }
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleCheckboxChange = (e) => {
//         const { name, checked } = e.target;
//         setEditFormData(prevState => ({
//             ...prevState,
//             [name]: checked
//         }));
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://localhost:44389/api/AirlineSighting/GetAll');
//                 setSightings(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching data: ', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleAdd = async (e) => {
//         e.preventDefault();

//         const imgData = new FormData();
//         imgData.append("file", imageSelected);
//         imgData.append("upload_preset", "ml_default");

//         try {
//             await axios.post(
//                 "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
//                 imgData
//             );

//             const response = await axios.post('https://localhost:44389/api/AirlineSighting/Add', formData);
//             await Swal.fire({
//                 title: "Success!",
//                 text: response.data.message,
//                 icon: 'success',
//                 confirmButtonText: "OK",
//                 type: "success"
//             });
//             window.location.href = "/";
//         } catch (error) {
//             console.error('Error adding sighting: ', error);
//             await Swal.fire({
//                 title: "Error!",
//                 text: error.data.message,
//                 icon: 'error',
//                 confirmButtonText: "OK",
//                 type: "success"
//             });
//             window.location.href = "/";
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.delete(`https://localhost:44389/api/AirlineSighting/Delete/${id}`);
//             await Swal.fire({
//                 title: "Success!",
//                 text: response.data.message,
//                 icon: 'success',
//                 confirmButtonText: "OK",
//                 type: "success"
//             });
//             window.location.href = "/";
//         } catch (error) {
//             console.error('Error deleting sighting: ', error);
//             await Swal.fire({
//                 title: "Error!",
//                 text: error.data.message,
//                 icon: 'error',
//                 confirmButtonText: "OK",
//                 type: "success"
//             });
//             window.location.href = "/";
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (files && files[0]) {
//             setImageSelected(files[0]);
//             setFormData(prevState => ({
//                 ...prevState,
//                 image: files[0].name,
//             }));
//         } else {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h3" sx={{ marginTop: '50px', marginBottom: "40px", fontWeight: 'bold' }} gutterBottom align="center">
//                 Airline Sightings
//             </Typography>

//             <Container maxWidth="md">
//                 <Card sx={{ padding: 2, boxShadow: 4, border: '1px solid #ccc' }}>
//                     <CardContent>
//                         <Typography variant="h5" gutterBottom align="center" >Add Airline Sighting</Typography>
//                         <form onSubmit={handleAdd}>
//                             <Grid container spacing={2} justifyContent="center">
//                                 <Grid item xs={12} sm={4} md={8}>
//                                     <TextField
//                                         fullWidth
//                                         label="Name"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         required
//                                         inputProps={{ maxLength: 150 }}
//                                         margin="normal"
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         label="Short Name"
//                                         name="shortName"
//                                         value={formData.shortName}
//                                         onChange={handleChange}
//                                         required
//                                         inputProps={{ maxLength: 5 }}
//                                         margin="normal"
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         label="Airline Code (Format: XXX-####)"
//                                         name="airlineCode"
//                                         value={formData.airlineCode}
//                                         onChange={handleChange}
//                                         required
//                                         inputProps={{ pattern: '^[A-Z]{3}-\\d{4}$' }}
//                                         margin="normal"
//                                     />
//                                     <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
//                                     <Input
//                                         type="file"
//                                         id="image-upload"
//                                         name="image"
//                                         onChange={handleChange}
//                                         accept="image/*"
//                                         margin="normal"
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         label="Location"
//                                         name="location"
//                                         value={formData.location}
//                                         onChange={handleChange}
//                                         required
//                                         inputProps={{ maxLength: 200 }}
//                                         margin="normal"
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         label="Created User ID"
//                                         name="createdUserId"
//                                         type="number"
//                                         value={formData.createdUserId}
//                                         onChange={handleChange}
//                                         required
//                                         margin="normal"
//                                     />
//                                     <Button
//                                         type="submit"
//                                         variant="contained"
//                                         color="primary"
//                                         fullWidth
//                                         style={{ marginTop: '20px' }}
//                                     >
//                                         Add AirlineSighting
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </Container>

//             <Container maxWidth="lg" sx={{ marginTop: 4 }}>
//                 <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12}>
//                         <TextField
//                             label="Search"
//                             variant="outlined"
//                             fullWidth
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <Button
//                                             variant="contained"
//                                             color="primary"
//                                             onClick={handleSearch}
//                                         >
//                                             Search
//                                         </Button>
//                                     </InputAdornment>
//                                 )
//                             }}
//                             style={{ marginBottom: '20px' }}
//                         />
//                     </Grid>
//                 </Grid>
//                 <TableContainer component={Paper} elevation={3}>
//                     <Table>
//                         <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
//                             <TableRow>                                
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Short Name</TableCell>
//                                 <TableCell>Airline Code</TableCell>
//                                 <TableCell>Location</TableCell>
//                                 <TableCell>Created Date Time</TableCell>
//                                 <TableCell>IsActive</TableCell>
//                                 <TableCell>IsDeleted</TableCell>
//                                 <TableCell>Image</TableCell>
//                                 <TableCell>CreatedUserId</TableCell>
//                                 <TableCell>ModifiedUserId</TableCell>
//                                 <TableCell>Action</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {sightings.map(sighting => (
//                                 <TableRow key={sighting.id}>                                    
//                                     <TableCell>{sighting.name}</TableCell>
//                                     <TableCell>{sighting.shortName}</TableCell>
//                                     <TableCell>{sighting.airlineCode}</TableCell>
//                                     <TableCell>{sighting.location}</TableCell>
//                                     <TableCell>{sighting.createdDateTime}</TableCell>
//                                     <TableCell>{sighting.isActive ? 'Yes' : 'No'}</TableCell>
//                                     <TableCell>{sighting.isDeleted ? 'Yes' : 'No'}</TableCell>
//                                     <TableCell>
//                                         {sighting.image && <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+sighting.image} alt="Airline Sighting" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
//                                     </TableCell>
//                                     <TableCell>{sighting.createdUserId}</TableCell>
//                                     <TableCell>{sighting.modifiedUserId}</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" aria-label="edit" onClick={() => handleEditModalOpen(sighting)}>
//                                             <EditIcon />
//                                         </IconButton>
//                                         {sighting.isDeleted === true && (
//                                             <>
//                                                 <IconButton color="error" aria-label="delete" onClick={() => handleDelete(sighting.id)}>
//                                                     <DeleteIcon />
//                                                 </IconButton>
//                                             </>
//                                         )}
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Container>
//             <EditModal
//                 isOpen={isEditModalOpen}
//                 onClose={handleEditModalClose}
//                 onSubmit={handleEditSubmit}
//                 formData={editformData}
//                 handleChange={handleEditChange}
//                 handleCheckboxChange={handleCheckboxChange}
//             />
//         </Container>
//     );
// };

// export default AirlineSightingApp;

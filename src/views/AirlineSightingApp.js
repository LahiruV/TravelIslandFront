import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddAirlineSightingForm from '../components/AirlineSightingForm';
import AirlineSightingTable from '../components/AirlineSightingTable';
import SearchBar from '../components/SearchBar';
import EditModal from '../components/EditModal';

const AirlineSightingApp = () => {
    const [sightings, setSightings] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [editformData, setEditFormData] = useState({
        id: 0,
        name: '',
        shortName: '',
        airlineCode: '',
        location: '',
        CreatedDateTime: '',
        modifiedUserId: 0,
        CreatedUserId: 0,
        isActive: false,
        isDeleted: false,
        image: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://airsighting.azurewebsites.net/api/AirlineSighting/GetAll');
                setSightings(response.data.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async () => {
        if (search === "") {
            window.location.href = "/";
        }
        else {
            try {
                const response = await axios.get(`https://airsighting.azurewebsites.net/api/AirlineSighting/Get/${search}`);
                setSightings(response.data.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
    }

    const handleEditModalOpen = (sighting) => {
        setEditFormData(sighting);
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`https://airsighting.azurewebsites.net/api/AirlineSighting/Update`, editformData);
            setIsEditModalOpen(false);
            window.location.href = "/";
        } catch (error) {
            console.error('Error updating sighting: ', error);
            await Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
            window.location.href = "/";
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditFormData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://airsighting.azurewebsites.net/api/AirlineSighting/Delete/${id}`);
            await Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            window.location.href = "/";
        } catch (error) {
            console.error('Error deleting sighting: ', error);
            await Swal.fire({
                title: "Error!",
                text: error.data.message,
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
            window.location.href = "/";
        }
    };

    const handleSearchChange = (value) => {
        setSearch(value);
    };

    return (
        <Container>
            <Typography variant="h3" sx={{ marginTop: '50px', marginBottom: "40px", fontWeight: 'bold' }} gutterBottom align="center">
                Airline Sightings
            </Typography>

            <Container maxWidth="md">
                <AddAirlineSightingForm/>
            </Container>

            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                <SearchBar search={search} onSearchChange={handleSearchChange} onSearch={handleSearch} />
                <AirlineSightingTable
                    sightings={sightings}
                    onDelete={handleDelete}
                    onEdit={handleEditModalOpen}
                />
            </Container>
            <EditModal
                isOpen={isEditModalOpen}
                onClose={handleEditModalClose}
                onSubmit={handleEditSubmit}
                formData={editformData}
                handleChange={handleEditChange}
                handleCheckboxChange={handleCheckboxChange}
            />
        </Container>
    );
};

export default AirlineSightingApp;

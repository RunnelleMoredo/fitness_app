import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, TextInput, Image, FlatList, ActivityIndicator } from 'react-native'


const API_BASE_URL = "http://192.168.1.10:5000/api/exercises";

export default function SearchExercise(){
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllExercises();
    }, []);

    useEffect(() => {
        fetchSearchExercises();
    }, [query]);

    const fetchAllExercises = async () => {
        setLoading(true);
        setError(null);

        try{
            const response = await fetch(`${API_BASE_URL}/`);

            if(!response.ok) {
                throw new Error("Failed to fetch exercises")
            }

            const data = await response.json();
            setResults(data);

        } catch(error){
            console.log('error', error);
        } finally{
            setLoading(false);
        }
    };

    const fetchSearchExercises = async () => {

        if(!query.trim()) {
            fetchAllExercises();
            return;
        }

        setLoading(true);
        setError(null);

        try{
            const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);

            if(!response.ok){
                throw new Error("Failed to fetch exercises")
            }

            const data = await response.json();
            setResults(data);

        } catch(error) {
            console.log('error', error);

        } finally {
            setLoading(false);
        }

    };

}

const styles = StyleSheet.create({})

import React, { Component, useState, useEffect } from 'react'
import { 
    Text, 
    StyleSheet, 
    View, 
    TextInput, 
    Image, 
    FlatList, 
    ActivityIndicator, 
} from 'react-native'


interface Exercise {
    name: string;
    equipments?: string[];
    instructions?: string[];
    targetMuscles?: string[];
    secondaryMuscles?: string[];
    gifUrl?: string;
}

//const API_BASE_URL = "http://192.168.1.10:5000/api/exercises";

//const API_BASE_URL = "http://127.0.0.1:5000/api/exercises";

const API_BASE_URL = "http://10.0.0.151:5000/api/exercises";


export default function SearchExercise(){
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Exercise[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!query.trim()) {
            setResults([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            fetchSearchExercises();
        }, 500);

        return () => clearTimeout(timeoutId);

    }, [query]);
    


    const fetchSearchExercises = async () => {
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
            setError('Could not load exercises');

        } finally {
            setLoading(false);
        }

    };

    return(
        <View className='flex-1 bg-background-100 p-4'>
            {/*Header */}
            <Text className='text-2xl font-bold'>
                Search Exercises
            </Text>

            {/*Text Input */}
            <TextInput 
                className='border border-gray-900 rounded-md p-3 mb-3'
                placeholder='Search exercises...'
                value={query}
                onChangeText={setQuery}
            />

            {/*Loading */}
            {loading &&(
                <ActivityIndicator size="large" className="mt-4" />
                )}

            {/*Error */}
            {error &&(
                <Text className="text-red-500 mt-2">
                    {error}
                </Text>
            )}

            {/*Results */}
            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View className='bg-gray-100 rounded-xl p-4 mb-3'>
                        <Text className='text-lg font-semibold'>
                            {item.name}
                        </Text>

                        {item.equipments && (
                            <Text className="text-gray-600 mt-1">
                                Target: {item.equipments.join(", ")}
                            </Text>
                        )}

                        {item.instructions && (
                            <Text className="text-gray-600 mt-1">
                                Target: {item.instructions.join(", ")}
                            </Text>
                        )}

                        {item.targetMuscles && (
                            <Text className="text-gray-600 mt-1">
                                Target: {item.targetMuscles.join(", ")}
                            </Text>
                        )}

                        {item.secondaryMuscles && (
                            <Text className="text-gray-600 mt-1">
                                Target: {item.secondaryMuscles.join(", ")}
                            </Text>
                        )}

                        {item.gifUrl && (
                            <Image
                                source={{ uri: item.gifUrl}}
                                className="w-full h-48 rounded-lg mt-3"
                                resizeMode="contain"
                            />
                        )}
                    </View>
                )}
                ListEmptyComponent={
                    !loading && query ? (
                        <Text className="text-gray-500 mt-6 text-center">
                            No exercises found
                        </Text>
                    ) : null
                }
            />

        </View>
    );

}


const styles = StyleSheet.create({})

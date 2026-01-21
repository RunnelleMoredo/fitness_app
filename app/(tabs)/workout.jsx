import { StyleSheet, Text, View, Pressable } from 'react-native'
import { router } from 'expo-router'
import React from 'react'

const workout = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <Pressable onPress={() => router.push("/workout_session")}>
                <Text className="text-5xl text-dark-200 font-bold">Start Workout</Text>
            </Pressable>
        </View>
        
    )
}   

export default workout

const styles = StyleSheet.create({})


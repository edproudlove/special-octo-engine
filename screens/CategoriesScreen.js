import React from 'react'
import { FlatList, Button, View, Text, StyleSheet } from 'react-native'


import { CATEGORIES } from '../data/dummy'
import CategoryGridTile from '../componants/CategoryGridTile'

const CategoriesScreen = props => {



    const renderGridData = (itemData) => {
        return <CategoryGridTile 
        title={itemData.item.title} 
        color={itemData.item.color}
        onSelect={() => {
            props.navigation.navigate({routeName: itemData.item.routeName, params:{
                categoryId: itemData.item.id
                }})
        }}/>
    }

    return (
        <View>

            <FlatList 
            numColumns={2} 
            data={CATEGORIES} 
            renderItem={renderGridData} />
            
       </View> 
    )
}

const styles = StyleSheet.create({
    addQuestionButton: {
        marginVertical: 40,
    },
    categoriesList: {
        height: '80%'
    },
    
})

export default CategoriesScreen;
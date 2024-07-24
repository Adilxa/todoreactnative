import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

type Props = {
    wrapperStyle: StyleProp<ViewStyle>;
    titleStyle: StyleProp<TextStyle>;
    isActive: boolean;
}

const RenderLeftAction = ({ wrapperStyle, titleStyle, isActive }: Props) => {
    return (
        <View style={wrapperStyle}>
            <Text style={titleStyle}> {!isActive ? "Done" : "Not Done"}</Text>
        </View>
    )
}

export default RenderLeftAction
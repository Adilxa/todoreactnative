import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

type Props = {
    wrapperStyle: StyleProp<ViewStyle>;
    titleStyle: StyleProp<TextStyle>;
}

const RenderRightAction = ({ wrapperStyle, titleStyle }: Props) => {
    return (
        <View style={wrapperStyle}>
            <Text style={titleStyle}>Delete</Text>
        </View>
    )
}

export default RenderRightAction
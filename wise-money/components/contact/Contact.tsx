import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import { ContactData } from './interface';

const ContactComponent: React.FC<{ contact: ContactData }> = ({ contact }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.left}>
                <Image source={{ uri: contact.image_url }} style={styles.roundImage} />
            </View>
            <View style={styles.right}>
                <Text style={[styles.text, { fontFamily: FONT.bold, fontSize: SIZES.h7 }]}>{contact.name}</Text>
                {contact.phone && <Text style={styles.text}>Phone: {contact.phone}</Text>}
                {contact.email && <Text style={styles.text}>Email: {contact.email}</Text>}
                {contact.address && <Text style={styles.text}>Address: {contact.address}</Text>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: COLORS.background
    },
    left: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    right: {
        flex: 8,
        justifyContent: 'flex-start',
    },
    roundImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    text: {
        fontFamily: FONT.regular,
        fontSize: SIZES.h8,
    },
});

export default ContactComponent;

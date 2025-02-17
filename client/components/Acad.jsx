import React from "react";
import { Text, ScrollView, StyleSheet, Linking } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";

const Acad = () => {
	return (
		<ScrollView>
			<Card style={Styles.container}>
				<Card.Content>
					<Title>ERP Portal</Title>
				</Card.Content>
				<Card.Cover source={require("../assets/images/ERP_Portal.png")} />
				<Card.Content>
					<Paragraph>Welcome to new academic portal of IIT Jodhpur</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button
						onPress={() => {
							Linking.openURL("http://220.158.144.41:8080/ERP_IITJ/");
						}}
					>
						Visit
					</Button>
				</Card.Actions>
			</Card>
			<Card style={Styles.container}>
				<Card.Content>
					<Title>Library</Title>
				</Card.Content>
				<Card.Cover source={require("../assets/images/Library.png")} />
				<Card.Content>
					<Paragraph>
						Explore the world’s knowledge : IIT Jodhpur Library
					</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button
						onPress={() => {
							Linking.openURL("https://library.iitj.ac.in/");
						}}
					>
						Visit
					</Button>
				</Card.Actions>
			</Card>
		</ScrollView>
	);
};
export default Acad;

const Styles = StyleSheet.create({
	container: {
		alignContent: "center",
		margin: 37,
	},
});

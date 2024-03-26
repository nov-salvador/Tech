import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [searchedIp, setSearchedIp] = useState('');
  const [searchedGeoInfo, setSearchedGeoInfo] = useState(null);
  const [error, setError] = useState('');

  const fetchGeoInfo = async (ip) => {
    try {
      const response = await fetch(`https://ipinfo.io/${ip}/geo`);
      const data = await response.json();
      setSearchedGeoInfo(data);
      setError('');
    } catch (err) {
      setError('Error fetching geolocation information');
    }
  };

  const fetchCurrentUserIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
      setSearchedIp('');
      fetchGeoInfo(data.ip);
    } catch (err) {
      setError('Error fetching current IP address');
    }
  };

  useEffect(() => {
    fetchCurrentUserIp();
  }, []);

  const handleSearch = () => {
    if (isValidIp(searchedIp)) {
      fetchGeoInfo(searchedIp);
    } else {
      setError('Invalid IP address');
    }
  };

  const handleClear = () => {
    fetchCurrentUserIp();
  };

  const handleLogout = () => {
    // Navigate back to login screen
    navigation.navigate('Login');
  };

  const isValidIp = (ip) => {
    const ipPattern = new RegExp(
      '^([0-9]{1,3}\\.){3}[0-9]{1,3}$'
    );
    return ipPattern.test(ip);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IP & Geolocation Information</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter IP Address"
          value={searchedIp}
          onChangeText={setSearchedIp}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.geoInfoContainer}>
        <Text style={styles.subtitle}>User IP Information</Text>
        <View>
          <Text>IP Address: {ipAddress}</Text>
        </View>
      </View>

      {searchedGeoInfo ? (
        <View style={styles.geoInfoContainer}>
          <Text style={styles.subtitle}>Searched IP Geolocation Information</Text>
          <Text>IP: {searchedGeoInfo.ip}</Text>
          <Text>City: {searchedGeoInfo.city}</Text>
          <Text>Region: {searchedGeoInfo.region}</Text>
          <Text>Country: {searchedGeoInfo.country}</Text>
          <Text>Location: {searchedGeoInfo.loc}</Text>
          <Text>Postal: {searchedGeoInfo.postal}</Text>
        </View>
      ) : (
        <Text></Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  geoInfoContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;

import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ProgressBar, Searchbar, Snackbar } from 'react-native-paper';

import { CustomTable } from './components/CustomTable';
import { Header } from './components/Header';

import { sleep } from './helpers/sleep';

const obtenerEstados = async (matricula: string) => {
  await sleep(2);
  const res = [
    {
      uid: '34ca248c-ae54-441e-954a-2a24ff4c79f3',
      fecha: '2021-10',
      descripcion: 'Enhanced',
    },
    {
      uid: '93c5dbdd-f9da-4cd8-adf9-29983baee1e6',
      fecha: '2013-06',
      descripcion: 'methodology',
    },
    {
      uid: '77e02cf5-abc4-4046-a8f7-25b645e2ffd4',
      fecha: '2005-12',
      descripcion: 'Polarised',
    },
    {
      uid: '94a9b3bc-a190-4e7e-a891-0b02c6b2c51e',
      fecha: '2014-12',
      descripcion: 'Face to face',
    },
    {
      uid: 'f9011269-6bbe-4c7a-83a6-1b5675fd9a87',
      fecha: '2004-02',
      descripcion: 'incremental',
    },
    {
      uid: '370674f4-9940-4d1d-a9f4-77515d0414ab',
      fecha: '2017-04',
      descripcion: 'Total',
    },
    {
      uid: 'e43129e1-5e36-4f23-934a-ab2b6749cf11',
      fecha: '2007-12',
      descripcion: 'analyzing',
    },
    {
      uid: '4d3b05c3-3b31-4d23-bd77-dba53f84259d',
      fecha: '2010-06',
      descripcion: 'zero defect',
    },
  ];
  throw new Error('Error al obtener los estados');
  return res;
};

const Main = () => {
  const { data, isFetching, isError, refetch } = useQuery(
    ['estados'],
    () => obtenerEstados(matricula),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: 1,
    },
  );

  const [matricula, setMatricula] = useState<string>('');
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const onChangeSearch = (query: string) => setMatricula(query);
  const buscarEstados = async () => {
    await refetch();
    console.log(data);
    setShowSnackbar(true);
  };

  const snackMessage = useMemo(() => {
    console.log('isError', isError);
    if (isError) {
      return 'Ha ocurrido un error, intente nuevamente';
    }
    if (data && data.length > 0) {
      return `Se encontraron ${data.length} estados de cuenta`;
    } else {
      return 'No se encontraron estados de cuenta';
    }
  }, [data, isError]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#0A2F66" />

      {/* Toast Info */}
      <View style={styles.info}>
        <Snackbar
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          duration={2000}
          action={{
            label: 'Undo',
            onPress: () => {
              setShowSnackbar(false);
            },
          }}>
          {snackMessage}
        </Snackbar>
      </View>

      {/* Content */}
      <ScrollView style={styles.fullView}>
        <Header />
        <View style={styles.inputContainer}>
          <Searchbar
            placeholder="Buscar"
            onChangeText={onChangeSearch}
            value={matricula}
            style={styles.input}
            keyboardType="number-pad"
            onSubmitEditing={buscarEstados}
          />
          <ProgressBar
            style={styles.progressBar}
            indeterminate
            color="#0A2F66"
            visible={isFetching}
          />
        </View>
        <CustomTable data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  fullView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFF',
  },
  progressBar: {
    marginTop: 20,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
  },
});

export default Main;

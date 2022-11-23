import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, DataTable, Text } from 'react-native-paper';

interface props {
  data: any[] | undefined;
}

type ItemsState = Array<{
  uid: string;
  fecha: string;
  descripcion: string;
}>;

export const CustomTable: React.FC<props> = ({ data }) => {
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [items, setItems] = useState<ItemsState>([]);
  const [numberOfItemsPerPageList] = useState([3, 5, 10]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const sortedItems = items.slice();
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyLabel}>Sin datos recientes</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            sortDirection={sortAscending ? 'ascending' : 'descending'}
            onPress={() => setSortAscending(!sortAscending)}>
            Fecha
          </DataTable.Title>
          <DataTable.Title>Descripción</DataTable.Title>
          <DataTable.Title>Opciones</DataTable.Title>
        </DataTable.Header>

        {sortedItems.slice(from, to).map(item => (
          <DataTable.Row key={item.uid}>
            <DataTable.Cell>{item.fecha}</DataTable.Cell>
            <DataTable.Cell>{item.descripcion}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                style={styles.button}
                labelStyle={styles.buttonLabel}
                icon="eye"
                mode="text"
                onPress={() => console.log('s')}>
                Ver
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(sortedItems.length / itemsPerPage)}
          onPageChange={newPage => setPage(newPage)}
          label={`${from + 1}-${to} de ${sortedItems.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Elementos por página'}
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 5,
  },
  content: {
    padding: 8,
  },
  button: {
    width: 100,
    backgroundColor: '#fff',
  },
  long: {
    flex: 2,
  },
  buttonLabel: {
    color: '#104ba2',
  },
  center: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

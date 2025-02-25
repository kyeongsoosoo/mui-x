import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  GridColumns,
  GridRowsProp,
  DataGrid,
  GridCellParams,
  GridEventListener,
  MuiEvent,
  GridEvents,
  useGridApiContext,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';

interface EditToolbarProps {
  selectedCellParams?: any;
  setSelectedCellParams: (value: any) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const apiRef = useGridApiContext();
  const { selectedCellParams, setSelectedCellParams } = props;

  const handleClick = async () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field, cellMode } = selectedCellParams;
    if (cellMode === 'edit') {
      apiRef.current.stopCellEditMode({ id, field });
      setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
    } else {
      apiRef.current.startCellEditMode({ id, field });
      setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
    }
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Button
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        color="primary"
      >
        {selectedCellParams?.cellMode === 'edit' ? 'Save' : 'Edit'}
      </Button>
    </Box>
  );
}

export default function StartEditButtonGrid() {
  const [selectedCellParams, setSelectedCellParams] =
    React.useState<GridCellParams | null>(null);

  const handleCellClick = React.useCallback((params: GridCellParams) => {
    setSelectedCellParams(params);
  }, []);

  const handleCellEditStart = (
    params: GridCellParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleCellEditStop: GridEventListener<GridEvents.cellEditStop> = (
    params,
    event,
  ) => {
    event.defaultMuiPrevented = true;
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={handleCellClick}
        onCellEditStart={handleCellEditStart}
        onCellEditStop={handleCellEditStop}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: {
            selectedCellParams,
            setSelectedCellParams,
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}

const columns: GridColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

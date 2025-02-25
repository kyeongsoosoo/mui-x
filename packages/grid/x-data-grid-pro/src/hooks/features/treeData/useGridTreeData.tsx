import * as React from 'react';
import {
  useGridApiEventHandler,
  GridEventListener,
  GridEvents,
  gridFilteredDescendantCountLookupSelector,
} from '@mui/x-data-grid';
import { GridApiPro } from '../../../models/gridApiPro';

/**
 * Only available in DataGridPro
 */
export const useGridTreeData = (apiRef: React.MutableRefObject<GridApiPro>) => {
  /**
   * EVENTS
   */
  const handleCellKeyDown = React.useCallback<GridEventListener<GridEvents.cellKeyDown>>(
    (params, event) => {
      const cellParams = apiRef.current.getCellParams(params.id, params.field);
      if (cellParams.colDef.type === 'treeDataGroup' && event.key === ' ' && !event.shiftKey) {
        event.stopPropagation();
        event.preventDefault();

        const filteredDescendantCount =
          gridFilteredDescendantCountLookupSelector(apiRef)[params.id] ?? 0;

        if (filteredDescendantCount === 0) {
          return;
        }

        apiRef.current.setRowChildrenExpansion(params.id, !params.rowNode.childrenExpanded);
      }
    },
    [apiRef],
  );

  useGridApiEventHandler(apiRef, GridEvents.cellKeyDown, handleCellKeyDown);
};

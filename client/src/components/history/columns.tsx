import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { CheckInHistory, CheckInStatus } from '@/pages/app/history'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export const columns: ColumnDef<CheckInHistory>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const rowValue = row.getValue('status')
      if (rowValue === CheckInStatus.AguardandoAprovação) {
        return <Badge variant="yellow">{rowValue}</Badge>
      } else if (rowValue === CheckInStatus.Aprovado) {
        return <Badge variant="green">{rowValue}</Badge>
      } else if (rowValue === CheckInStatus.Expirado) {
        return <Badge variant="red">{rowValue}</Badge>
      }
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'gym',
    header: 'Academia',
  },
]

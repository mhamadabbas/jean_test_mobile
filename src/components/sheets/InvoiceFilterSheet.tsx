import { Sheet } from '@tamagui/sheet'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'tamagui'
import { Filter } from 'types/filter.type'
import {
    CustomerSelectController,
    TextInputController,
    ToggleGroupController,
} from '../controllers'

export type InvoiceFilterFormValues = {
  id?: string
  status?: string
  customerId?: string
}

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void

  filters: Filter[]
  onFilterChange: (filters: Filter[]) => void
}

const statusOptions = [
  { label: 'Unpaid', value: '' },
  { label: 'Paid', value: 'paid' },
  { label: 'Finalized', value: 'finalized' },
]

const InvoiceFilterSheet: FC<Props> = ({
  isOpen,
  setIsOpen,
  filters = [],
  onFilterChange,
}) => {
  const { control, handleSubmit } = useForm<InvoiceFilterFormValues>({})

  const onSubmit = (data: InvoiceFilterFormValues) => {
    const newFilters = []
    if (data.id) {
      newFilters.push({ field: 'id', operator: 'eq', value: data.id.toString() })
    }

    if (data.status && ['paid', 'finalized'].includes(data.status)) {
      newFilters.push({ field: 'status', operator: 'eq', value: data.status })
    }

    if (data.customerId) {
      newFilters.push({
        field: 'customer_id',
        operator: 'eq',
        value: data.customerId.toString(),
      })
    }

    onFilterChange(newFilters)
    setIsOpen(false)
  }

  return (
    <Sheet
      modal
      open={isOpen}
      zIndex={100_000}
      snapPoints={[300]}
      dismissOnSnapToBottom
      snapPointsMode='constant'
      onOpenChange={setIsOpen}
    >
      <Sheet.Overlay animation="lazy" backgroundColor="$shadow6" />
      <Sheet.Frame p="$4" alignItems="center" gap="$4">
        <TextInputController
          name="id"
          control={control}
          placeholder="Invoice ID"
        />
        <CustomerSelectController name="customerId" control={control} />
        <ToggleGroupController
          name="status"
          control={control}
          options={statusOptions}
        />
        <Button onPress={handleSubmit(onSubmit)}>Validate</Button>
      </Sheet.Frame>
    </Sheet>
  )
}

export default InvoiceFilterSheet

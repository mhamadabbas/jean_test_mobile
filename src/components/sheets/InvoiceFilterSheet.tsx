import { Sheet } from '@tamagui/sheet'
import { FC } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { Button, Text } from 'tamagui'
import { Filter } from 'types/filter.type'
import {
  CustomerSelectController,
  TextInputController,
  ToggleGroupController,
} from '../controllers'

export type InvoiceFilterFormValues = {
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
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' },
  { label: 'Finalized', value: 'finalized' },
]

const InvoiceFilterSheet: FC<Props> = ({
  isOpen,
  setIsOpen,
  filters = [],
  onFilterChange,
}) => {
  const hasPaidFilter = filters.find((filter) => filter.field === 'paid')
  const hasFinalizedFilter = filters.find((filter) => filter.field === 'finalized')
  const defaultCustomerId = filters.find((filter) => filter.field === 'customer_id')?.value as string | undefined;

  const defaultValues: InvoiceFilterFormValues = {
    customerId: defaultCustomerId,
    status: hasPaidFilter ? 'paid' : hasFinalizedFilter ? 'finalized' : undefined,
  }

  const { control, handleSubmit } = useForm<InvoiceFilterFormValues>({
    defaultValues,
    resolver: async (data) => {
      const errors: Partial<Record<keyof InvoiceFilterFormValues, FieldError>> = {}
      if (data.customerId && isNaN(Number(data.customerId)))
        errors.customerId = { message: 'Customer ID must be a number', type: 'manual' }
      return { errors, values: data }
    },
  })

  const onSubmit = (data: InvoiceFilterFormValues) => {
    const newFilters = [];

    if (data.status === 'finalized') {
      newFilters.push({ field: 'finalized', operator: 'eq', value: true })
    }

    if (data.status === 'paid') {
      newFilters.push({ field: 'paid', operator: 'eq', value: 'true' })
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

  const handleClear = () => {
    onFilterChange([])
    setIsOpen(false)
  }

  return (
    <Sheet
      modal
      open={isOpen}
      snapPoints={[350]}
      dismissOnSnapToBottom
      snapPointsMode='constant'
      onOpenChange={setIsOpen}
    >
      <Sheet.Overlay animation="lazy" backgroundColor="$shadow6" />
      <Sheet.Frame p="$4" alignItems="center" gap="$4">
        <Text fontSize={20} fontWeight="bold">Filter invoices</Text>
        <CustomerSelectController name="customerId" control={control} />
        <ToggleGroupController
          name="status"
          control={control}
          options={statusOptions}
        />
        <Button width="100%" onPress={handleSubmit(onSubmit)}>Validate</Button>
        <Button width="100%" variant="outlined" onPress={handleClear}>Clear</Button>
      </Sheet.Frame>
    </Sheet>
  )
}

export default InvoiceFilterSheet

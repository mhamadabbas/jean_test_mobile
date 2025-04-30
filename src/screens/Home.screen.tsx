import { Fragment, useCallback, useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Filter as FilterIcon } from '@tamagui/lucide-icons'

import InvoicesList from '@/components/lists/InvoicesList'
import { InvoiceFilterSheet } from '@/components/sheets'
import { Filter } from '@/types/index'

const HomeScreen = () => {
  const { setOptions } = useNavigation()
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<Filter[]>([])

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  useEffect(() => {
    setOptions({
      headerRight: () => <FilterIcon onPress={handleToggle} />,
    })
  }, [handleToggle, setOptions])

  return (
    <Fragment>
      <InvoicesList filters={filters} />
      <InvoiceFilterSheet isOpen={isOpen} setIsOpen={setIsOpen} filters={filters} onFilterChange={setFilters} />
    </Fragment>
  )
}

export default HomeScreen

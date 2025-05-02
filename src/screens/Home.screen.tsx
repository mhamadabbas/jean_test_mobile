import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'

import { NavigationProp, useNavigation } from '@react-navigation/native'
import { PlusSquare } from '@tamagui/lucide-icons'

import { CustomerSelect } from '@/components/inputs'
import InvoicesList from '@/components/lists/InvoicesList'
import { RootStackParamList } from '@/navigation/App.navigator'
import { Filter } from '@/types/index'
import { Text, ToggleGroup, View } from 'tamagui'

const HomeScreen = () => {
  const [customerId, setCustomerId] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<'draft' | 'finalized'>('finalized');
  const { setOptions, navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const handleChangeTab = useCallback((tab: 'draft' | 'finalized') => {
    setCurrentTab(tab);
  }, []);

  const computedFilters = useMemo(() => {
    const result: Filter[] = [
      { field: 'finalized', operator: 'eq', value: currentTab !== 'draft' }
    ];

    if (customerId) result.push({ field: 'customer_id', operator: 'eq', value: customerId });

    return result;
  }, [customerId, currentTab]);

  useEffect(() => {
    setOptions({
      headerRight: () => <PlusSquare size={20} onPress={() => navigate('NewInvoice')} />,
    })
  }, [setOptions, navigate])

  return (
    <Fragment>
      <ToggleGroup disableDeactivation width="100%" type="single" value={currentTab} onValueChange={handleChangeTab}>
        <ToggleGroup.Item width="50%" value="finalized">
          <Text>Finalized</Text>
        </ToggleGroup.Item>
        <ToggleGroup.Item width="50%" value="draft">
          <Text>Draft</Text>
        </ToggleGroup.Item>
      </ToggleGroup>
      <View width="100%" padding={16}>
        <CustomerSelect value={customerId} onChange={setCustomerId} />
      </View>
      <InvoicesList filters={computedFilters} />
    </Fragment>
  )
}

export default HomeScreen

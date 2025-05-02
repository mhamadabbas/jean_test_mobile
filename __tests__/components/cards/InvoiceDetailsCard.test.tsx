import { describe, it, expect } from '@jest/globals';

import { screen } from '@testing-library/react-native'
import { InvoiceDetailsCard } from '@/components/cards/InvoiceDetailsCard'
import { invoiceMock } from '../../__mocks__/invoice.mock'
import { formatDate } from 'utils/date'
import { getInvoiceStatus } from 'utils/invoice'
import { formatPrice } from 'utils/number';
import { render } from '../../__mocks__/render';

describe('InvoiceDetailsCard', () => {
    it('should render invoice details correctly', () => {
        render(<InvoiceDetailsCard invoice={invoiceMock} />)

        expect(screen.getByText('Invoice ID')).toBeTruthy()
        expect(screen.getByText(invoiceMock.id.toString())).toBeTruthy()

        expect(screen.getByText('Status')).toBeTruthy()
        expect(screen.getByText(getInvoiceStatus(invoiceMock))).toBeTruthy()

        expect(screen.getByText('Customer ID')).toBeTruthy()
        expect(screen.getByText(invoiceMock.customer_id!.toString())).toBeTruthy()

        expect(screen.getByText('Billing date')).toBeTruthy()
        expect(screen.getByText(formatDate(invoiceMock.date!))).toBeTruthy()

        expect(screen.getByText('Due date')).toBeTruthy()
        expect(screen.getByText(formatDate(invoiceMock.deadline!))).toBeTruthy()

        expect(screen.getByText('Amount')).toBeTruthy()
        expect(screen.getByText(formatPrice(invoiceMock.total))).toBeTruthy()
    })

    it('should not render optional fields when not provided', () => {
        const incompleteInvoice = {
            ...invoiceMock,
            date: null,
            deadline: null,
            total: null
        }

        render(<InvoiceDetailsCard invoice={incompleteInvoice} />)

        expect(screen.queryByText('Billing date')).toBeFalsy()
        expect(screen.queryByText('Due date')).toBeFalsy()
        expect(screen.queryByText('Amount')).toBeFalsy()
    })
})

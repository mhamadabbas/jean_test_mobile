import React, { ReactNode, createContext, useContext, useRef } from 'react'
import OpenAPIClientAxios from 'openapi-client-axios'
import { Client } from './generated/client'
import definition from './generated/schema.json'
import qs from 'qs';

interface ApiContextState {
  client: Client | undefined
}

const ApiContext = createContext<ApiContextState>({
  client: undefined,
})

interface ApiProviderProps {
  url: string
  token: string
  children?: ReactNode
}

export const ApiProvider: React.FC<ApiProviderProps> = ({
  url,
  token,
  children,
}) => {
  const apiRef = useRef(
    new OpenAPIClientAxios({
      /* @ts-ignore */
      definition,
      withServer: { url },
      axiosConfigDefaults: {
        paramsSerializer: (params) => {
          console.log(params);
          
          const finalParams: Record<string, string> = {};

          for (const key in params) {
            if (Array.isArray(params[key])) {
              finalParams[key] = JSON.stringify(params[key]);
            } else {
              finalParams[key] = params[key];
            }
          }

          return qs.stringify(finalParams, {
            encode: true,
            format: 'RFC1738',
            arrayFormat: 'brackets',
            serializeDate: (date: Date) => date.toISOString(),
        })},
        headers: {
          'X-SESSION': token,
        },
      },
    }),
  )

  const clientRef = useRef(apiRef.current.initSync<Client>())

  return (
    <ApiContext.Provider value={{ client: clientRef.current }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = () => {
  const { client } = useContext(ApiContext)

  if (!client) {
    throw new Error('A client API must be defined')
  }

  return client
}

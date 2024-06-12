import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Login user */
  login: Scalars['String']['output'];
  /** Logout user */
  logout: Scalars['Boolean']['output'];
  /** Register user */
  register: Scalars['String']['output'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Get user by ID */
  getCurrentUser: User;
  getTreeById: Tree;
};


export type QueryGetTreeByIdArgs = {
  id: Scalars['UUID']['input'];
};

export type Tree = {
  __typename?: 'Tree';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** User object */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  /** User email */
  email: Scalars['EmailAddress']['output'];
  id: Scalars['UUID']['output'];
  /** User role */
  role: UserRole;
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** User roles */
export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}

export type GetTreeByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTreeByIdQuery = { __typename?: 'Query', getTreeById: { __typename?: 'Tree', id: any, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string } };


export const GetTreeByIdDocument = gql`
    query GetTreeById($id: UUID!) {
  getTreeById(id: $id) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
  }
}
    `;

/**
 * __useGetTreeByIdQuery__
 *
 * To run a query within a React component, call `useGetTreeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTreeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTreeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTreeByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTreeByIdQuery, GetTreeByIdQueryVariables> & ({ variables: GetTreeByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTreeByIdQuery, GetTreeByIdQueryVariables>(GetTreeByIdDocument, options);
      }
export function useGetTreeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTreeByIdQuery, GetTreeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTreeByIdQuery, GetTreeByIdQueryVariables>(GetTreeByIdDocument, options);
        }
export function useGetTreeByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTreeByIdQuery, GetTreeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTreeByIdQuery, GetTreeByIdQueryVariables>(GetTreeByIdDocument, options);
        }
export type GetTreeByIdQueryHookResult = ReturnType<typeof useGetTreeByIdQuery>;
export type GetTreeByIdLazyQueryHookResult = ReturnType<typeof useGetTreeByIdLazyQuery>;
export type GetTreeByIdSuspenseQueryHookResult = ReturnType<typeof useGetTreeByIdSuspenseQuery>;
export type GetTreeByIdQueryResult = Apollo.QueryResult<GetTreeByIdQuery, GetTreeByIdQueryVariables>;
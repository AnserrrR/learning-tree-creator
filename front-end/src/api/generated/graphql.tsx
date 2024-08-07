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

export type EdgeInput = {
  sourceId: Scalars['String']['input'];
  sourcePosition: PositionEnum;
  targetId: Scalars['String']['input'];
  targetPosition: PositionEnum;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTree: Tree;
  deleteTree: Scalars['Boolean']['output'];
  /** Login user */
  login: Scalars['String']['output'];
  /** Logout user */
  logout: Scalars['Boolean']['output'];
  /** Register user */
  register: Scalars['String']['output'];
  updateSection: TreeNode;
  updateTree: Tree;
};


export type MutationCreateTreeArgs = {
  input: TreeCreateInput;
};


export type MutationDeleteTreeArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateSectionArgs = {
  input: SectionUpdateInput;
};


export type MutationUpdateTreeArgs = {
  input: TreeUpdateInput;
};

export type NodeFileObject = {
  __typename?: 'NodeFileObject';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  fileId: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  isImage: Scalars['Boolean']['output'];
  node: TreeNode;
  nodeId: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type NodeLinkObject = {
  __typename?: 'NodeLinkObject';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['UUID']['output'];
  node: TreeNode;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  url: Scalars['String']['output'];
};

/** Position of the edge */
export enum PositionEnum {
  Bottom = 'Bottom',
  Left = 'Left',
  Right = 'Right',
  Top = 'Top'
}

export type Query = {
  __typename?: 'Query';
  /** Get user by ID */
  getCurrentUser: User;
  getFilteredTrees: Array<Tree>;
  getFilteredUserTrees: Array<Tree>;
  getSectionById: TreeNode;
  getTreeById: Tree;
};


export type QueryGetFilteredTreesArgs = {
  input: TreeGetFilteredInput;
};


export type QueryGetFilteredUserTreesArgs = {
  input: TreeGetFilteredInput;
};


export type QueryGetSectionByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetTreeByIdArgs = {
  id: Scalars['UUID']['input'];
};

export type SectionUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isComplete?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
};

export type TaskObject = {
  __typename?: 'TaskObject';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['UUID']['output'];
  isComplete: Scalars['Boolean']['output'];
  node: TreeNode;
  note: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type Tree = {
  __typename?: 'Tree';
  authorId: Scalars['String']['output'];
  chaptersCompiled: Scalars['Float']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  imageId: Scalars['String']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nodes: Array<TreeNode>;
  updatedAt: Scalars['DateTimeISO']['output'];
  userId: Scalars['String']['output'];
};

export type TreeCreateInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type TreeGetFilteredInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TreeNode = {
  __typename?: 'TreeNode';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  files: Array<NodeFileObject>;
  id: Scalars['UUID']['output'];
  isComplete: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  links: Array<NodeLinkObject>;
  positionX: Scalars['Float']['output'];
  positionY: Scalars['Float']['output'];
  tasks: Array<TaskObject>;
  tree: Tree;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type TreeNodeInput = {
  id: Scalars['UUID']['input'];
  label: Scalars['String']['input'];
  positionX: Scalars['Float']['input'];
  positionY: Scalars['Float']['input'];
};

export type TreeUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  edges: Array<EdgeInput>;
  id: Scalars['UUID']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nodes: Array<TreeNodeInput>;
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

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: any, email: any } };

export type GetUserTreesQueryVariables = Exact<{
  input: TreeGetFilteredInput;
}>;


export type GetUserTreesQuery = { __typename?: 'Query', getFilteredUserTrees: Array<{ __typename?: 'Tree', id: any, name: string, description: string, createdAt: any, updatedAt: any }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type GetTreeByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTreeByIdQuery = { __typename?: 'Query', getTreeById: { __typename?: 'Tree', id: any, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string } };

export type UpdateTreeMutationVariables = Exact<{
  input: TreeUpdateInput;
}>;


export type UpdateTreeMutation = { __typename?: 'Mutation', updateTree: { __typename?: 'Tree', id: any, name: string, description: string } };


export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    email
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserTreesDocument = gql`
    query GetUserTrees($input: TreeGetFilteredInput!) {
  getFilteredUserTrees(input: $input) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserTreesQuery__
 *
 * To run a query within a React component, call `useGetUserTreesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTreesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTreesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserTreesQuery(baseOptions: Apollo.QueryHookOptions<GetUserTreesQuery, GetUserTreesQueryVariables> & ({ variables: GetUserTreesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTreesQuery, GetUserTreesQueryVariables>(GetUserTreesDocument, options);
      }
export function useGetUserTreesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTreesQuery, GetUserTreesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTreesQuery, GetUserTreesQueryVariables>(GetUserTreesDocument, options);
        }
export function useGetUserTreesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserTreesQuery, GetUserTreesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserTreesQuery, GetUserTreesQueryVariables>(GetUserTreesDocument, options);
        }
export type GetUserTreesQueryHookResult = ReturnType<typeof useGetUserTreesQuery>;
export type GetUserTreesLazyQueryHookResult = ReturnType<typeof useGetUserTreesLazyQuery>;
export type GetUserTreesSuspenseQueryHookResult = ReturnType<typeof useGetUserTreesSuspenseQuery>;
export type GetUserTreesQueryResult = Apollo.QueryResult<GetUserTreesQuery, GetUserTreesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
export const UpdateTreeDocument = gql`
    mutation UpdateTree($input: TreeUpdateInput!) {
  updateTree(input: $input) {
    id
    name
    description
  }
}
    `;
export type UpdateTreeMutationFn = Apollo.MutationFunction<UpdateTreeMutation, UpdateTreeMutationVariables>;

/**
 * __useUpdateTreeMutation__
 *
 * To run a mutation, you first call `useUpdateTreeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTreeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTreeMutation, { data, loading, error }] = useUpdateTreeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTreeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTreeMutation, UpdateTreeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTreeMutation, UpdateTreeMutationVariables>(UpdateTreeDocument, options);
      }
export type UpdateTreeMutationHookResult = ReturnType<typeof useUpdateTreeMutation>;
export type UpdateTreeMutationResult = Apollo.MutationResult<UpdateTreeMutation>;
export type UpdateTreeMutationOptions = Apollo.BaseMutationOptions<UpdateTreeMutation, UpdateTreeMutationVariables>;
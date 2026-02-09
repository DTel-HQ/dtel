
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model numberVIP
 * 
 */
export type numberVIP = $Result.DefaultSelection<Prisma.$numberVIPPayload>
/**
 * Model mailboxMessage
 * 
 */
export type mailboxMessage = $Result.DefaultSelection<Prisma.$mailboxMessagePayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>
/**
 * Model atAndBy
 * 
 */
export type atAndBy = $Result.DefaultSelection<Prisma.$atAndByPayload>
/**
 * Model onHold
 * 
 */
export type onHold = $Result.DefaultSelection<Prisma.$onHoldPayload>
/**
 * Model Mailbox
 * 
 */
export type Mailbox = $Result.DefaultSelection<Prisma.$MailboxPayload>
/**
 * Model Numbers
 * 
 */
export type Numbers = $Result.DefaultSelection<Prisma.$NumbersPayload>
/**
 * Model CallMessages
 * 
 */
export type CallMessages = $Result.DefaultSelection<Prisma.$CallMessagesPayload>
/**
 * Model ActiveCalls
 * 
 */
export type ActiveCalls = $Result.DefaultSelection<Prisma.$ActiveCallsPayload>
/**
 * Model ArchivedCalls
 * 
 */
export type ArchivedCalls = $Result.DefaultSelection<Prisma.$ArchivedCallsPayload>
/**
 * Model GuildConfigs
 * 
 */
export type GuildConfigs = $Result.DefaultSelection<Prisma.$GuildConfigsPayload>
/**
 * Model Accounts
 * 
 */
export type Accounts = $Result.DefaultSelection<Prisma.$AccountsPayload>
/**
 * Model Strikes
 * 
 */
export type Strikes = $Result.DefaultSelection<Prisma.$StrikesPayload>
/**
 * Model Blacklist
 * 
 */
export type Blacklist = $Result.DefaultSelection<Prisma.$BlacklistPayload>
/**
 * Model Phonebook
 * 
 */
export type Phonebook = $Result.DefaultSelection<Prisma.$PhonebookPayload>
/**
 * Model Promote
 * 
 */
export type Promote = $Result.DefaultSelection<Prisma.$PromotePayload>
/**
 * Model Votes
 * 
 */
export type Votes = $Result.DefaultSelection<Prisma.$VotesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StrikeOffenderType: {
  USER: 'USER',
  GUILD: 'GUILD'
};

export type StrikeOffenderType = (typeof StrikeOffenderType)[keyof typeof StrikeOffenderType]

}

export type StrikeOffenderType = $Enums.StrikeOffenderType

export const StrikeOffenderType: typeof $Enums.StrikeOffenderType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Mailboxes
 * const mailboxes = await prisma.mailbox.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Mailboxes
   * const mailboxes = await prisma.mailbox.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.mailbox`: Exposes CRUD operations for the **Mailbox** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mailboxes
    * const mailboxes = await prisma.mailbox.findMany()
    * ```
    */
  get mailbox(): Prisma.MailboxDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.numbers`: Exposes CRUD operations for the **Numbers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Numbers
    * const numbers = await prisma.numbers.findMany()
    * ```
    */
  get numbers(): Prisma.NumbersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.callMessages`: Exposes CRUD operations for the **CallMessages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallMessages
    * const callMessages = await prisma.callMessages.findMany()
    * ```
    */
  get callMessages(): Prisma.CallMessagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activeCalls`: Exposes CRUD operations for the **ActiveCalls** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActiveCalls
    * const activeCalls = await prisma.activeCalls.findMany()
    * ```
    */
  get activeCalls(): Prisma.ActiveCallsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.archivedCalls`: Exposes CRUD operations for the **ArchivedCalls** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArchivedCalls
    * const archivedCalls = await prisma.archivedCalls.findMany()
    * ```
    */
  get archivedCalls(): Prisma.ArchivedCallsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guildConfigs`: Exposes CRUD operations for the **GuildConfigs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuildConfigs
    * const guildConfigs = await prisma.guildConfigs.findMany()
    * ```
    */
  get guildConfigs(): Prisma.GuildConfigsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accounts`: Exposes CRUD operations for the **Accounts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.accounts.findMany()
    * ```
    */
  get accounts(): Prisma.AccountsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.strikes`: Exposes CRUD operations for the **Strikes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Strikes
    * const strikes = await prisma.strikes.findMany()
    * ```
    */
  get strikes(): Prisma.StrikesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blacklist`: Exposes CRUD operations for the **Blacklist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blacklists
    * const blacklists = await prisma.blacklist.findMany()
    * ```
    */
  get blacklist(): Prisma.BlacklistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.phonebook`: Exposes CRUD operations for the **Phonebook** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Phonebooks
    * const phonebooks = await prisma.phonebook.findMany()
    * ```
    */
  get phonebook(): Prisma.PhonebookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promote`: Exposes CRUD operations for the **Promote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Promotes
    * const promotes = await prisma.promote.findMany()
    * ```
    */
  get promote(): Prisma.PromoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.votes`: Exposes CRUD operations for the **Votes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.votes.findMany()
    * ```
    */
  get votes(): Prisma.VotesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Mailbox: 'Mailbox',
    Numbers: 'Numbers',
    CallMessages: 'CallMessages',
    ActiveCalls: 'ActiveCalls',
    ArchivedCalls: 'ArchivedCalls',
    GuildConfigs: 'GuildConfigs',
    Accounts: 'Accounts',
    Strikes: 'Strikes',
    Blacklist: 'Blacklist',
    Phonebook: 'Phonebook',
    Promote: 'Promote',
    Votes: 'Votes'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "mailbox" | "numbers" | "callMessages" | "activeCalls" | "archivedCalls" | "guildConfigs" | "accounts" | "strikes" | "blacklist" | "phonebook" | "promote" | "votes"
      txIsolationLevel: never
    }
    model: {
      Mailbox: {
        payload: Prisma.$MailboxPayload<ExtArgs>
        fields: Prisma.MailboxFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MailboxFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MailboxPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MailboxFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MailboxPayload>
          }
          findFirst: {
            args: Prisma.MailboxFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MailboxPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MailboxFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MailboxPayload>
          }
          findMany: {
            args: Prisma.MailboxFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MailboxPayload>[]
          }
          create: {
            args: Prisma.MailboxCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MailboxPayload>
          }
          createMany: {
            args: Prisma.MailboxCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MailboxDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MailboxPayload>
          }
          update: {
            args: Prisma.MailboxUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MailboxPayload>
          }
          deleteMany: {
            args: Prisma.MailboxDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MailboxUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MailboxUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MailboxPayload>
          }
          aggregate: {
            args: Prisma.MailboxAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMailbox>
          }
          groupBy: {
            args: Prisma.MailboxGroupByArgs<ExtArgs>
            result: $Utils.Optional<MailboxGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MailboxFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MailboxAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MailboxCountArgs<ExtArgs>
            result: $Utils.Optional<MailboxCountAggregateOutputType> | number
          }
        }
      }
      Numbers: {
        payload: Prisma.$NumbersPayload<ExtArgs>
        fields: Prisma.NumbersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NumbersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NumbersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NumbersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NumbersPayload>
          }
          findFirst: {
            args: Prisma.NumbersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NumbersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NumbersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NumbersPayload>
          }
          findMany: {
            args: Prisma.NumbersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NumbersPayload>[]
          }
          create: {
            args: Prisma.NumbersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NumbersPayload>
          }
          createMany: {
            args: Prisma.NumbersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NumbersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NumbersPayload>
          }
          update: {
            args: Prisma.NumbersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NumbersPayload>
          }
          deleteMany: {
            args: Prisma.NumbersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NumbersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NumbersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NumbersPayload>
          }
          aggregate: {
            args: Prisma.NumbersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNumbers>
          }
          groupBy: {
            args: Prisma.NumbersGroupByArgs<ExtArgs>
            result: $Utils.Optional<NumbersGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.NumbersFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.NumbersAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.NumbersCountArgs<ExtArgs>
            result: $Utils.Optional<NumbersCountAggregateOutputType> | number
          }
        }
      }
      CallMessages: {
        payload: Prisma.$CallMessagesPayload<ExtArgs>
        fields: Prisma.CallMessagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallMessagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallMessagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallMessagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallMessagesPayload>
          }
          findFirst: {
            args: Prisma.CallMessagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallMessagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallMessagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallMessagesPayload>
          }
          findMany: {
            args: Prisma.CallMessagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallMessagesPayload>[]
          }
          create: {
            args: Prisma.CallMessagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallMessagesPayload>
          }
          createMany: {
            args: Prisma.CallMessagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CallMessagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallMessagesPayload>
          }
          update: {
            args: Prisma.CallMessagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallMessagesPayload>
          }
          deleteMany: {
            args: Prisma.CallMessagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallMessagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CallMessagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallMessagesPayload>
          }
          aggregate: {
            args: Prisma.CallMessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallMessages>
          }
          groupBy: {
            args: Prisma.CallMessagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallMessagesGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CallMessagesFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CallMessagesAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CallMessagesCountArgs<ExtArgs>
            result: $Utils.Optional<CallMessagesCountAggregateOutputType> | number
          }
        }
      }
      ActiveCalls: {
        payload: Prisma.$ActiveCallsPayload<ExtArgs>
        fields: Prisma.ActiveCallsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActiveCallsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveCallsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActiveCallsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveCallsPayload>
          }
          findFirst: {
            args: Prisma.ActiveCallsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveCallsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActiveCallsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveCallsPayload>
          }
          findMany: {
            args: Prisma.ActiveCallsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveCallsPayload>[]
          }
          create: {
            args: Prisma.ActiveCallsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveCallsPayload>
          }
          createMany: {
            args: Prisma.ActiveCallsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ActiveCallsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveCallsPayload>
          }
          update: {
            args: Prisma.ActiveCallsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveCallsPayload>
          }
          deleteMany: {
            args: Prisma.ActiveCallsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActiveCallsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActiveCallsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveCallsPayload>
          }
          aggregate: {
            args: Prisma.ActiveCallsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActiveCalls>
          }
          groupBy: {
            args: Prisma.ActiveCallsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActiveCallsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ActiveCallsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ActiveCallsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ActiveCallsCountArgs<ExtArgs>
            result: $Utils.Optional<ActiveCallsCountAggregateOutputType> | number
          }
        }
      }
      ArchivedCalls: {
        payload: Prisma.$ArchivedCallsPayload<ExtArgs>
        fields: Prisma.ArchivedCallsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArchivedCallsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchivedCallsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArchivedCallsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchivedCallsPayload>
          }
          findFirst: {
            args: Prisma.ArchivedCallsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchivedCallsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArchivedCallsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchivedCallsPayload>
          }
          findMany: {
            args: Prisma.ArchivedCallsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchivedCallsPayload>[]
          }
          create: {
            args: Prisma.ArchivedCallsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchivedCallsPayload>
          }
          createMany: {
            args: Prisma.ArchivedCallsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ArchivedCallsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchivedCallsPayload>
          }
          update: {
            args: Prisma.ArchivedCallsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchivedCallsPayload>
          }
          deleteMany: {
            args: Prisma.ArchivedCallsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArchivedCallsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArchivedCallsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchivedCallsPayload>
          }
          aggregate: {
            args: Prisma.ArchivedCallsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArchivedCalls>
          }
          groupBy: {
            args: Prisma.ArchivedCallsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArchivedCallsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ArchivedCallsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ArchivedCallsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ArchivedCallsCountArgs<ExtArgs>
            result: $Utils.Optional<ArchivedCallsCountAggregateOutputType> | number
          }
        }
      }
      GuildConfigs: {
        payload: Prisma.$GuildConfigsPayload<ExtArgs>
        fields: Prisma.GuildConfigsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuildConfigsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuildConfigsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigsPayload>
          }
          findFirst: {
            args: Prisma.GuildConfigsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuildConfigsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigsPayload>
          }
          findMany: {
            args: Prisma.GuildConfigsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigsPayload>[]
          }
          create: {
            args: Prisma.GuildConfigsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigsPayload>
          }
          createMany: {
            args: Prisma.GuildConfigsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GuildConfigsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigsPayload>
          }
          update: {
            args: Prisma.GuildConfigsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigsPayload>
          }
          deleteMany: {
            args: Prisma.GuildConfigsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuildConfigsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GuildConfigsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigsPayload>
          }
          aggregate: {
            args: Prisma.GuildConfigsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuildConfigs>
          }
          groupBy: {
            args: Prisma.GuildConfigsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuildConfigsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.GuildConfigsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.GuildConfigsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.GuildConfigsCountArgs<ExtArgs>
            result: $Utils.Optional<GuildConfigsCountAggregateOutputType> | number
          }
        }
      }
      Accounts: {
        payload: Prisma.$AccountsPayload<ExtArgs>
        fields: Prisma.AccountsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountsPayload>
          }
          findFirst: {
            args: Prisma.AccountsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountsPayload>
          }
          findMany: {
            args: Prisma.AccountsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountsPayload>[]
          }
          create: {
            args: Prisma.AccountsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountsPayload>
          }
          createMany: {
            args: Prisma.AccountsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AccountsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountsPayload>
          }
          update: {
            args: Prisma.AccountsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountsPayload>
          }
          deleteMany: {
            args: Prisma.AccountsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountsPayload>
          }
          aggregate: {
            args: Prisma.AccountsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccounts>
          }
          groupBy: {
            args: Prisma.AccountsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AccountsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AccountsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AccountsCountArgs<ExtArgs>
            result: $Utils.Optional<AccountsCountAggregateOutputType> | number
          }
        }
      }
      Strikes: {
        payload: Prisma.$StrikesPayload<ExtArgs>
        fields: Prisma.StrikesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StrikesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrikesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StrikesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrikesPayload>
          }
          findFirst: {
            args: Prisma.StrikesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrikesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StrikesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrikesPayload>
          }
          findMany: {
            args: Prisma.StrikesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrikesPayload>[]
          }
          create: {
            args: Prisma.StrikesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrikesPayload>
          }
          createMany: {
            args: Prisma.StrikesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StrikesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrikesPayload>
          }
          update: {
            args: Prisma.StrikesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrikesPayload>
          }
          deleteMany: {
            args: Prisma.StrikesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StrikesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StrikesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrikesPayload>
          }
          aggregate: {
            args: Prisma.StrikesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStrikes>
          }
          groupBy: {
            args: Prisma.StrikesGroupByArgs<ExtArgs>
            result: $Utils.Optional<StrikesGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.StrikesFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.StrikesAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.StrikesCountArgs<ExtArgs>
            result: $Utils.Optional<StrikesCountAggregateOutputType> | number
          }
        }
      }
      Blacklist: {
        payload: Prisma.$BlacklistPayload<ExtArgs>
        fields: Prisma.BlacklistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlacklistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlacklistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistPayload>
          }
          findFirst: {
            args: Prisma.BlacklistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlacklistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistPayload>
          }
          findMany: {
            args: Prisma.BlacklistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistPayload>[]
          }
          create: {
            args: Prisma.BlacklistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistPayload>
          }
          createMany: {
            args: Prisma.BlacklistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BlacklistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistPayload>
          }
          update: {
            args: Prisma.BlacklistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistPayload>
          }
          deleteMany: {
            args: Prisma.BlacklistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlacklistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlacklistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistPayload>
          }
          aggregate: {
            args: Prisma.BlacklistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlacklist>
          }
          groupBy: {
            args: Prisma.BlacklistGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlacklistGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.BlacklistFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.BlacklistAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.BlacklistCountArgs<ExtArgs>
            result: $Utils.Optional<BlacklistCountAggregateOutputType> | number
          }
        }
      }
      Phonebook: {
        payload: Prisma.$PhonebookPayload<ExtArgs>
        fields: Prisma.PhonebookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhonebookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonebookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhonebookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonebookPayload>
          }
          findFirst: {
            args: Prisma.PhonebookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonebookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhonebookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonebookPayload>
          }
          findMany: {
            args: Prisma.PhonebookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonebookPayload>[]
          }
          create: {
            args: Prisma.PhonebookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonebookPayload>
          }
          createMany: {
            args: Prisma.PhonebookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PhonebookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonebookPayload>
          }
          update: {
            args: Prisma.PhonebookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonebookPayload>
          }
          deleteMany: {
            args: Prisma.PhonebookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhonebookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PhonebookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhonebookPayload>
          }
          aggregate: {
            args: Prisma.PhonebookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhonebook>
          }
          groupBy: {
            args: Prisma.PhonebookGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhonebookGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PhonebookFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PhonebookAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PhonebookCountArgs<ExtArgs>
            result: $Utils.Optional<PhonebookCountAggregateOutputType> | number
          }
        }
      }
      Promote: {
        payload: Prisma.$PromotePayload<ExtArgs>
        fields: Prisma.PromoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotePayload>
          }
          findFirst: {
            args: Prisma.PromoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotePayload>
          }
          findMany: {
            args: Prisma.PromoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotePayload>[]
          }
          create: {
            args: Prisma.PromoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotePayload>
          }
          createMany: {
            args: Prisma.PromoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PromoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotePayload>
          }
          update: {
            args: Prisma.PromoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotePayload>
          }
          deleteMany: {
            args: Prisma.PromoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PromoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotePayload>
          }
          aggregate: {
            args: Prisma.PromoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromote>
          }
          groupBy: {
            args: Prisma.PromoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromoteGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PromoteFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PromoteAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PromoteCountArgs<ExtArgs>
            result: $Utils.Optional<PromoteCountAggregateOutputType> | number
          }
        }
      }
      Votes: {
        payload: Prisma.$VotesPayload<ExtArgs>
        fields: Prisma.VotesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VotesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VotesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          findFirst: {
            args: Prisma.VotesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VotesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          findMany: {
            args: Prisma.VotesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>[]
          }
          create: {
            args: Prisma.VotesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          createMany: {
            args: Prisma.VotesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VotesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          update: {
            args: Prisma.VotesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          deleteMany: {
            args: Prisma.VotesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VotesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VotesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotesPayload>
          }
          aggregate: {
            args: Prisma.VotesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVotes>
          }
          groupBy: {
            args: Prisma.VotesGroupByArgs<ExtArgs>
            result: $Utils.Optional<VotesGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.VotesFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.VotesAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.VotesCountArgs<ExtArgs>
            result: $Utils.Optional<VotesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    mailbox?: MailboxOmit
    numbers?: NumbersOmit
    callMessages?: CallMessagesOmit
    activeCalls?: ActiveCallsOmit
    archivedCalls?: ArchivedCallsOmit
    guildConfigs?: GuildConfigsOmit
    accounts?: AccountsOmit
    strikes?: StrikesOmit
    blacklist?: BlacklistOmit
    phonebook?: PhonebookOmit
    promote?: PromoteOmit
    votes?: VotesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type NumbersCountOutputType
   */

  export type NumbersCountOutputType = {
    outgoingCalls: number
    incomingCalls: number
  }

  export type NumbersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outgoingCalls?: boolean | NumbersCountOutputTypeCountOutgoingCallsArgs
    incomingCalls?: boolean | NumbersCountOutputTypeCountIncomingCallsArgs
  }

  // Custom InputTypes
  /**
   * NumbersCountOutputType without action
   */
  export type NumbersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NumbersCountOutputType
     */
    select?: NumbersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NumbersCountOutputType without action
   */
  export type NumbersCountOutputTypeCountOutgoingCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveCallsWhereInput
  }

  /**
   * NumbersCountOutputType without action
   */
  export type NumbersCountOutputTypeCountIncomingCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveCallsWhereInput
  }


  /**
   * Count Type GuildConfigsCountOutputType
   */

  export type GuildConfigsCountOutputType = {
    numbers: number
    strikes: number
  }

  export type GuildConfigsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    numbers?: boolean | GuildConfigsCountOutputTypeCountNumbersArgs
    strikes?: boolean | GuildConfigsCountOutputTypeCountStrikesArgs
  }

  // Custom InputTypes
  /**
   * GuildConfigsCountOutputType without action
   */
  export type GuildConfigsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigsCountOutputType
     */
    select?: GuildConfigsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuildConfigsCountOutputType without action
   */
  export type GuildConfigsCountOutputTypeCountNumbersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NumbersWhereInput
  }

  /**
   * GuildConfigsCountOutputType without action
   */
  export type GuildConfigsCountOutputTypeCountStrikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrikesWhereInput
  }


  /**
   * Count Type AccountsCountOutputType
   */

  export type AccountsCountOutputType = {
    strikes: number
  }

  export type AccountsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strikes?: boolean | AccountsCountOutputTypeCountStrikesArgs
  }

  // Custom InputTypes
  /**
   * AccountsCountOutputType without action
   */
  export type AccountsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountsCountOutputType
     */
    select?: AccountsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountsCountOutputType without action
   */
  export type AccountsCountOutputTypeCountStrikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrikesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model numberVIP
   */





  export type numberVIPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    expiry?: boolean
    hidden?: boolean
    name?: boolean
  }, ExtArgs["result"]["numberVIP"]>



  export type numberVIPSelectScalar = {
    expiry?: boolean
    hidden?: boolean
    name?: boolean
  }

  export type numberVIPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"expiry" | "hidden" | "name", ExtArgs["result"]["numberVIP"]>

  export type $numberVIPPayload = {
    name: "numberVIP"
    objects: {}
    scalars: {
      expiry: Date
      hidden: boolean
      name: string
    }
    composites: {}
  }

  type numberVIPGetPayload<S extends boolean | null | undefined | numberVIPDefaultArgs> = $Result.GetResult<Prisma.$numberVIPPayload, S>





  /**
   * Fields of the numberVIP model
   */
  interface numberVIPFieldRefs {
    readonly expiry: FieldRef<"numberVIP", 'DateTime'>
    readonly hidden: FieldRef<"numberVIP", 'Boolean'>
    readonly name: FieldRef<"numberVIP", 'String'>
  }
    

  // Custom InputTypes
  /**
   * numberVIP without action
   */
  export type numberVIPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the numberVIP
     */
    select?: numberVIPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the numberVIP
     */
    omit?: numberVIPOmit<ExtArgs> | null
  }


  /**
   * Model mailboxMessage
   */





  export type mailboxMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from?: boolean
    message?: boolean
    sent?: boolean | atAndByDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mailboxMessage"]>



  export type mailboxMessageSelectScalar = {
    id?: boolean
    from?: boolean
    message?: boolean
  }

  export type mailboxMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "from" | "message" | "sent", ExtArgs["result"]["mailboxMessage"]>
  export type mailboxMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $mailboxMessagePayload = {
    name: "mailboxMessage"
    objects: {}
    scalars: {
      id: string
      from: string
      message: string
    }
    composites: {
      sent: Prisma.$atAndByPayload
    }
  }

  type mailboxMessageGetPayload<S extends boolean | null | undefined | mailboxMessageDefaultArgs> = $Result.GetResult<Prisma.$mailboxMessagePayload, S>





  /**
   * Fields of the mailboxMessage model
   */
  interface mailboxMessageFieldRefs {
    readonly id: FieldRef<"mailboxMessage", 'String'>
    readonly from: FieldRef<"mailboxMessage", 'String'>
    readonly message: FieldRef<"mailboxMessage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * mailboxMessage without action
   */
  export type mailboxMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mailboxMessage
     */
    select?: mailboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mailboxMessage
     */
    omit?: mailboxMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mailboxMessageInclude<ExtArgs> | null
  }


  /**
   * Model Contact
   */





  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    number?: boolean
    description?: boolean
  }, ExtArgs["result"]["contact"]>



  export type ContactSelectScalar = {
    name?: boolean
    number?: boolean
    description?: boolean
  }

  export type ContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"name" | "number" | "description", ExtArgs["result"]["contact"]>

  export type $ContactPayload = {
    name: "Contact"
    objects: {}
    scalars: {
      name: string
      number: string
      description: string
    }
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>





  /**
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly name: FieldRef<"Contact", 'String'>
    readonly number: FieldRef<"Contact", 'String'>
    readonly description: FieldRef<"Contact", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
  }


  /**
   * Model atAndBy
   */





  export type atAndBySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    at?: boolean
    by?: boolean
  }, ExtArgs["result"]["atAndBy"]>



  export type atAndBySelectScalar = {
    at?: boolean
    by?: boolean
  }

  export type atAndByOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"at" | "by", ExtArgs["result"]["atAndBy"]>

  export type $atAndByPayload = {
    name: "atAndBy"
    objects: {}
    scalars: {
      at: Date
      by: string
    }
    composites: {}
  }

  type atAndByGetPayload<S extends boolean | null | undefined | atAndByDefaultArgs> = $Result.GetResult<Prisma.$atAndByPayload, S>





  /**
   * Fields of the atAndBy model
   */
  interface atAndByFieldRefs {
    readonly at: FieldRef<"atAndBy", 'DateTime'>
    readonly by: FieldRef<"atAndBy", 'String'>
  }
    

  // Custom InputTypes
  /**
   * atAndBy without action
   */
  export type atAndByDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atAndBy
     */
    select?: atAndBySelect<ExtArgs> | null
    /**
     * Omit specific fields from the atAndBy
     */
    omit?: atAndByOmit<ExtArgs> | null
  }


  /**
   * Model onHold
   */





  export type onHoldSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    onHold?: boolean
    holdingSide?: boolean
  }, ExtArgs["result"]["onHold"]>



  export type onHoldSelectScalar = {
    onHold?: boolean
    holdingSide?: boolean
  }

  export type onHoldOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"onHold" | "holdingSide", ExtArgs["result"]["onHold"]>

  export type $onHoldPayload = {
    name: "onHold"
    objects: {}
    scalars: {
      onHold: boolean
      holdingSide: string | null
    }
    composites: {}
  }

  type onHoldGetPayload<S extends boolean | null | undefined | onHoldDefaultArgs> = $Result.GetResult<Prisma.$onHoldPayload, S>





  /**
   * Fields of the onHold model
   */
  interface onHoldFieldRefs {
    readonly onHold: FieldRef<"onHold", 'Boolean'>
    readonly holdingSide: FieldRef<"onHold", 'String'>
  }
    

  // Custom InputTypes
  /**
   * onHold without action
   */
  export type onHoldDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the onHold
     */
    select?: onHoldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the onHold
     */
    omit?: onHoldOmit<ExtArgs> | null
  }


  /**
   * Model Mailbox
   */

  export type AggregateMailbox = {
    _count: MailboxCountAggregateOutputType | null
    _min: MailboxMinAggregateOutputType | null
    _max: MailboxMaxAggregateOutputType | null
  }

  export type MailboxMinAggregateOutputType = {
    number: string | null
    autoreply: string | null
    receiving: boolean | null
  }

  export type MailboxMaxAggregateOutputType = {
    number: string | null
    autoreply: string | null
    receiving: boolean | null
  }

  export type MailboxCountAggregateOutputType = {
    number: number
    autoreply: number
    receiving: number
    _all: number
  }


  export type MailboxMinAggregateInputType = {
    number?: true
    autoreply?: true
    receiving?: true
  }

  export type MailboxMaxAggregateInputType = {
    number?: true
    autoreply?: true
    receiving?: true
  }

  export type MailboxCountAggregateInputType = {
    number?: true
    autoreply?: true
    receiving?: true
    _all?: true
  }

  export type MailboxAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mailbox to aggregate.
     */
    where?: MailboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mailboxes to fetch.
     */
    orderBy?: MailboxOrderByWithRelationInput | MailboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MailboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mailboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mailboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mailboxes
    **/
    _count?: true | MailboxCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MailboxMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MailboxMaxAggregateInputType
  }

  export type GetMailboxAggregateType<T extends MailboxAggregateArgs> = {
        [P in keyof T & keyof AggregateMailbox]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMailbox[P]>
      : GetScalarType<T[P], AggregateMailbox[P]>
  }




  export type MailboxGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MailboxWhereInput
    orderBy?: MailboxOrderByWithAggregationInput | MailboxOrderByWithAggregationInput[]
    by: MailboxScalarFieldEnum[] | MailboxScalarFieldEnum
    having?: MailboxScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MailboxCountAggregateInputType | true
    _min?: MailboxMinAggregateInputType
    _max?: MailboxMaxAggregateInputType
  }

  export type MailboxGroupByOutputType = {
    number: string
    autoreply: string
    receiving: boolean
    _count: MailboxCountAggregateOutputType | null
    _min: MailboxMinAggregateOutputType | null
    _max: MailboxMaxAggregateOutputType | null
  }

  type GetMailboxGroupByPayload<T extends MailboxGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MailboxGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MailboxGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MailboxGroupByOutputType[P]>
            : GetScalarType<T[P], MailboxGroupByOutputType[P]>
        }
      >
    >


  export type MailboxSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number?: boolean
    autoreply?: boolean
    receiving?: boolean
    messages?: boolean | mailboxMessageDefaultArgs<ExtArgs>
    numberDoc?: boolean | Mailbox$numberDocArgs<ExtArgs>
  }, ExtArgs["result"]["mailbox"]>



  export type MailboxSelectScalar = {
    number?: boolean
    autoreply?: boolean
    receiving?: boolean
  }

  export type MailboxOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number" | "autoreply" | "receiving" | "messages", ExtArgs["result"]["mailbox"]>
  export type MailboxInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    numberDoc?: boolean | Mailbox$numberDocArgs<ExtArgs>
  }

  export type $MailboxPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mailbox"
    objects: {
      numberDoc: Prisma.$NumbersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      number: string
      autoreply: string
      receiving: boolean
    }, ExtArgs["result"]["mailbox"]>
    composites: {
      messages: Prisma.$mailboxMessagePayload[]
    }
  }

  type MailboxGetPayload<S extends boolean | null | undefined | MailboxDefaultArgs> = $Result.GetResult<Prisma.$MailboxPayload, S>

  type MailboxCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MailboxFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MailboxCountAggregateInputType | true
    }

  export interface MailboxDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mailbox'], meta: { name: 'Mailbox' } }
    /**
     * Find zero or one Mailbox that matches the filter.
     * @param {MailboxFindUniqueArgs} args - Arguments to find a Mailbox
     * @example
     * // Get one Mailbox
     * const mailbox = await prisma.mailbox.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MailboxFindUniqueArgs>(args: SelectSubset<T, MailboxFindUniqueArgs<ExtArgs>>): Prisma__MailboxClient<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mailbox that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MailboxFindUniqueOrThrowArgs} args - Arguments to find a Mailbox
     * @example
     * // Get one Mailbox
     * const mailbox = await prisma.mailbox.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MailboxFindUniqueOrThrowArgs>(args: SelectSubset<T, MailboxFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MailboxClient<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mailbox that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MailboxFindFirstArgs} args - Arguments to find a Mailbox
     * @example
     * // Get one Mailbox
     * const mailbox = await prisma.mailbox.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MailboxFindFirstArgs>(args?: SelectSubset<T, MailboxFindFirstArgs<ExtArgs>>): Prisma__MailboxClient<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mailbox that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MailboxFindFirstOrThrowArgs} args - Arguments to find a Mailbox
     * @example
     * // Get one Mailbox
     * const mailbox = await prisma.mailbox.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MailboxFindFirstOrThrowArgs>(args?: SelectSubset<T, MailboxFindFirstOrThrowArgs<ExtArgs>>): Prisma__MailboxClient<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mailboxes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MailboxFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mailboxes
     * const mailboxes = await prisma.mailbox.findMany()
     * 
     * // Get first 10 Mailboxes
     * const mailboxes = await prisma.mailbox.findMany({ take: 10 })
     * 
     * // Only select the `number`
     * const mailboxWithNumberOnly = await prisma.mailbox.findMany({ select: { number: true } })
     * 
     */
    findMany<T extends MailboxFindManyArgs>(args?: SelectSubset<T, MailboxFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mailbox.
     * @param {MailboxCreateArgs} args - Arguments to create a Mailbox.
     * @example
     * // Create one Mailbox
     * const Mailbox = await prisma.mailbox.create({
     *   data: {
     *     // ... data to create a Mailbox
     *   }
     * })
     * 
     */
    create<T extends MailboxCreateArgs>(args: SelectSubset<T, MailboxCreateArgs<ExtArgs>>): Prisma__MailboxClient<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mailboxes.
     * @param {MailboxCreateManyArgs} args - Arguments to create many Mailboxes.
     * @example
     * // Create many Mailboxes
     * const mailbox = await prisma.mailbox.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MailboxCreateManyArgs>(args?: SelectSubset<T, MailboxCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Mailbox.
     * @param {MailboxDeleteArgs} args - Arguments to delete one Mailbox.
     * @example
     * // Delete one Mailbox
     * const Mailbox = await prisma.mailbox.delete({
     *   where: {
     *     // ... filter to delete one Mailbox
     *   }
     * })
     * 
     */
    delete<T extends MailboxDeleteArgs>(args: SelectSubset<T, MailboxDeleteArgs<ExtArgs>>): Prisma__MailboxClient<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mailbox.
     * @param {MailboxUpdateArgs} args - Arguments to update one Mailbox.
     * @example
     * // Update one Mailbox
     * const mailbox = await prisma.mailbox.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MailboxUpdateArgs>(args: SelectSubset<T, MailboxUpdateArgs<ExtArgs>>): Prisma__MailboxClient<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mailboxes.
     * @param {MailboxDeleteManyArgs} args - Arguments to filter Mailboxes to delete.
     * @example
     * // Delete a few Mailboxes
     * const { count } = await prisma.mailbox.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MailboxDeleteManyArgs>(args?: SelectSubset<T, MailboxDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mailboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MailboxUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mailboxes
     * const mailbox = await prisma.mailbox.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MailboxUpdateManyArgs>(args: SelectSubset<T, MailboxUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mailbox.
     * @param {MailboxUpsertArgs} args - Arguments to update or create a Mailbox.
     * @example
     * // Update or create a Mailbox
     * const mailbox = await prisma.mailbox.upsert({
     *   create: {
     *     // ... data to create a Mailbox
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mailbox we want to update
     *   }
     * })
     */
    upsert<T extends MailboxUpsertArgs>(args: SelectSubset<T, MailboxUpsertArgs<ExtArgs>>): Prisma__MailboxClient<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mailboxes that matches the filter.
     * @param {MailboxFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const mailbox = await prisma.mailbox.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MailboxFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Mailbox.
     * @param {MailboxAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const mailbox = await prisma.mailbox.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MailboxAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Mailboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MailboxCountArgs} args - Arguments to filter Mailboxes to count.
     * @example
     * // Count the number of Mailboxes
     * const count = await prisma.mailbox.count({
     *   where: {
     *     // ... the filter for the Mailboxes we want to count
     *   }
     * })
    **/
    count<T extends MailboxCountArgs>(
      args?: Subset<T, MailboxCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MailboxCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mailbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MailboxAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MailboxAggregateArgs>(args: Subset<T, MailboxAggregateArgs>): Prisma.PrismaPromise<GetMailboxAggregateType<T>>

    /**
     * Group by Mailbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MailboxGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MailboxGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MailboxGroupByArgs['orderBy'] }
        : { orderBy?: MailboxGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MailboxGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMailboxGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mailbox model
   */
  readonly fields: MailboxFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mailbox.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MailboxClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    numberDoc<T extends Mailbox$numberDocArgs<ExtArgs> = {}>(args?: Subset<T, Mailbox$numberDocArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mailbox model
   */
  interface MailboxFieldRefs {
    readonly number: FieldRef<"Mailbox", 'String'>
    readonly autoreply: FieldRef<"Mailbox", 'String'>
    readonly receiving: FieldRef<"Mailbox", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Mailbox findUnique
   */
  export type MailboxFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    /**
     * Filter, which Mailbox to fetch.
     */
    where: MailboxWhereUniqueInput
  }

  /**
   * Mailbox findUniqueOrThrow
   */
  export type MailboxFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    /**
     * Filter, which Mailbox to fetch.
     */
    where: MailboxWhereUniqueInput
  }

  /**
   * Mailbox findFirst
   */
  export type MailboxFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    /**
     * Filter, which Mailbox to fetch.
     */
    where?: MailboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mailboxes to fetch.
     */
    orderBy?: MailboxOrderByWithRelationInput | MailboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mailboxes.
     */
    cursor?: MailboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mailboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mailboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mailboxes.
     */
    distinct?: MailboxScalarFieldEnum | MailboxScalarFieldEnum[]
  }

  /**
   * Mailbox findFirstOrThrow
   */
  export type MailboxFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    /**
     * Filter, which Mailbox to fetch.
     */
    where?: MailboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mailboxes to fetch.
     */
    orderBy?: MailboxOrderByWithRelationInput | MailboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mailboxes.
     */
    cursor?: MailboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mailboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mailboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mailboxes.
     */
    distinct?: MailboxScalarFieldEnum | MailboxScalarFieldEnum[]
  }

  /**
   * Mailbox findMany
   */
  export type MailboxFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    /**
     * Filter, which Mailboxes to fetch.
     */
    where?: MailboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mailboxes to fetch.
     */
    orderBy?: MailboxOrderByWithRelationInput | MailboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mailboxes.
     */
    cursor?: MailboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mailboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mailboxes.
     */
    skip?: number
    distinct?: MailboxScalarFieldEnum | MailboxScalarFieldEnum[]
  }

  /**
   * Mailbox create
   */
  export type MailboxCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    /**
     * The data needed to create a Mailbox.
     */
    data: XOR<MailboxCreateInput, MailboxUncheckedCreateInput>
  }

  /**
   * Mailbox createMany
   */
  export type MailboxCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mailboxes.
     */
    data: MailboxCreateManyInput | MailboxCreateManyInput[]
  }

  /**
   * Mailbox update
   */
  export type MailboxUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    /**
     * The data needed to update a Mailbox.
     */
    data: XOR<MailboxUpdateInput, MailboxUncheckedUpdateInput>
    /**
     * Choose, which Mailbox to update.
     */
    where: MailboxWhereUniqueInput
  }

  /**
   * Mailbox updateMany
   */
  export type MailboxUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mailboxes.
     */
    data: XOR<MailboxUpdateManyMutationInput, MailboxUncheckedUpdateManyInput>
    /**
     * Filter which Mailboxes to update
     */
    where?: MailboxWhereInput
    /**
     * Limit how many Mailboxes to update.
     */
    limit?: number
  }

  /**
   * Mailbox upsert
   */
  export type MailboxUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    /**
     * The filter to search for the Mailbox to update in case it exists.
     */
    where: MailboxWhereUniqueInput
    /**
     * In case the Mailbox found by the `where` argument doesn't exist, create a new Mailbox with this data.
     */
    create: XOR<MailboxCreateInput, MailboxUncheckedCreateInput>
    /**
     * In case the Mailbox was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MailboxUpdateInput, MailboxUncheckedUpdateInput>
  }

  /**
   * Mailbox delete
   */
  export type MailboxDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    /**
     * Filter which Mailbox to delete.
     */
    where: MailboxWhereUniqueInput
  }

  /**
   * Mailbox deleteMany
   */
  export type MailboxDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mailboxes to delete
     */
    where?: MailboxWhereInput
    /**
     * Limit how many Mailboxes to delete.
     */
    limit?: number
  }

  /**
   * Mailbox findRaw
   */
  export type MailboxFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Mailbox aggregateRaw
   */
  export type MailboxAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Mailbox.numberDoc
   */
  export type Mailbox$numberDocArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    where?: NumbersWhereInput
  }

  /**
   * Mailbox without action
   */
  export type MailboxDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
  }


  /**
   * Model Numbers
   */

  export type AggregateNumbers = {
    _count: NumbersCountAggregateOutputType | null
    _min: NumbersMinAggregateOutputType | null
    _max: NumbersMaxAggregateOutputType | null
  }

  export type NumbersMinAggregateOutputType = {
    number: string | null
    channelID: string | null
    guildID: string | null
    userID: string | null
    expiry: Date | null
    waiting: boolean | null
    createdAt: Date | null
  }

  export type NumbersMaxAggregateOutputType = {
    number: string | null
    channelID: string | null
    guildID: string | null
    userID: string | null
    expiry: Date | null
    waiting: boolean | null
    createdAt: Date | null
  }

  export type NumbersCountAggregateOutputType = {
    number: number
    channelID: number
    guildID: number
    userID: number
    blocked: number
    expiry: number
    mentions: number
    waiting: number
    createdAt: number
    fka: number
    _all: number
  }


  export type NumbersMinAggregateInputType = {
    number?: true
    channelID?: true
    guildID?: true
    userID?: true
    expiry?: true
    waiting?: true
    createdAt?: true
  }

  export type NumbersMaxAggregateInputType = {
    number?: true
    channelID?: true
    guildID?: true
    userID?: true
    expiry?: true
    waiting?: true
    createdAt?: true
  }

  export type NumbersCountAggregateInputType = {
    number?: true
    channelID?: true
    guildID?: true
    userID?: true
    blocked?: true
    expiry?: true
    mentions?: true
    waiting?: true
    createdAt?: true
    fka?: true
    _all?: true
  }

  export type NumbersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Numbers to aggregate.
     */
    where?: NumbersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Numbers to fetch.
     */
    orderBy?: NumbersOrderByWithRelationInput | NumbersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NumbersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Numbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Numbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Numbers
    **/
    _count?: true | NumbersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NumbersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NumbersMaxAggregateInputType
  }

  export type GetNumbersAggregateType<T extends NumbersAggregateArgs> = {
        [P in keyof T & keyof AggregateNumbers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNumbers[P]>
      : GetScalarType<T[P], AggregateNumbers[P]>
  }




  export type NumbersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NumbersWhereInput
    orderBy?: NumbersOrderByWithAggregationInput | NumbersOrderByWithAggregationInput[]
    by: NumbersScalarFieldEnum[] | NumbersScalarFieldEnum
    having?: NumbersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NumbersCountAggregateInputType | true
    _min?: NumbersMinAggregateInputType
    _max?: NumbersMaxAggregateInputType
  }

  export type NumbersGroupByOutputType = {
    number: string
    channelID: string
    guildID: string | null
    userID: string | null
    blocked: string[]
    expiry: Date
    mentions: string[]
    waiting: boolean
    createdAt: Date
    fka: string[]
    _count: NumbersCountAggregateOutputType | null
    _min: NumbersMinAggregateOutputType | null
    _max: NumbersMaxAggregateOutputType | null
  }

  type GetNumbersGroupByPayload<T extends NumbersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NumbersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NumbersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NumbersGroupByOutputType[P]>
            : GetScalarType<T[P], NumbersGroupByOutputType[P]>
        }
      >
    >


  export type NumbersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number?: boolean
    channelID?: boolean
    guildID?: boolean
    userID?: boolean
    blocked?: boolean
    contacts?: boolean | ContactDefaultArgs<ExtArgs>
    expiry?: boolean
    mentions?: boolean
    vip?: boolean | numberVIPDefaultArgs<ExtArgs>
    waiting?: boolean
    createdAt?: boolean
    fka?: boolean
    mailbox?: boolean | Numbers$mailboxArgs<ExtArgs>
    outgoingCalls?: boolean | Numbers$outgoingCallsArgs<ExtArgs>
    incomingCalls?: boolean | Numbers$incomingCallsArgs<ExtArgs>
    guild?: boolean | Numbers$guildArgs<ExtArgs>
    phonebook?: boolean | Numbers$phonebookArgs<ExtArgs>
    _count?: boolean | NumbersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["numbers"]>



  export type NumbersSelectScalar = {
    number?: boolean
    channelID?: boolean
    guildID?: boolean
    userID?: boolean
    blocked?: boolean
    expiry?: boolean
    mentions?: boolean
    waiting?: boolean
    createdAt?: boolean
    fka?: boolean
  }

  export type NumbersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number" | "channelID" | "guildID" | "userID" | "blocked" | "contacts" | "expiry" | "mentions" | "vip" | "waiting" | "createdAt" | "fka", ExtArgs["result"]["numbers"]>
  export type NumbersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mailbox?: boolean | Numbers$mailboxArgs<ExtArgs>
    outgoingCalls?: boolean | Numbers$outgoingCallsArgs<ExtArgs>
    incomingCalls?: boolean | Numbers$incomingCallsArgs<ExtArgs>
    guild?: boolean | Numbers$guildArgs<ExtArgs>
    phonebook?: boolean | Numbers$phonebookArgs<ExtArgs>
    _count?: boolean | NumbersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $NumbersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Numbers"
    objects: {
      mailbox: Prisma.$MailboxPayload<ExtArgs> | null
      outgoingCalls: Prisma.$ActiveCallsPayload<ExtArgs>[]
      incomingCalls: Prisma.$ActiveCallsPayload<ExtArgs>[]
      guild: Prisma.$GuildConfigsPayload<ExtArgs> | null
      phonebook: Prisma.$PhonebookPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      number: string
      channelID: string
      guildID: string | null
      userID: string | null
      blocked: string[]
      expiry: Date
      mentions: string[]
      waiting: boolean
      createdAt: Date
      fka: string[]
    }, ExtArgs["result"]["numbers"]>
    composites: {
      contacts: Prisma.$ContactPayload[]
      vip: Prisma.$numberVIPPayload | null
    }
  }

  type NumbersGetPayload<S extends boolean | null | undefined | NumbersDefaultArgs> = $Result.GetResult<Prisma.$NumbersPayload, S>

  type NumbersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NumbersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NumbersCountAggregateInputType | true
    }

  export interface NumbersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Numbers'], meta: { name: 'Numbers' } }
    /**
     * Find zero or one Numbers that matches the filter.
     * @param {NumbersFindUniqueArgs} args - Arguments to find a Numbers
     * @example
     * // Get one Numbers
     * const numbers = await prisma.numbers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NumbersFindUniqueArgs>(args: SelectSubset<T, NumbersFindUniqueArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Numbers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NumbersFindUniqueOrThrowArgs} args - Arguments to find a Numbers
     * @example
     * // Get one Numbers
     * const numbers = await prisma.numbers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NumbersFindUniqueOrThrowArgs>(args: SelectSubset<T, NumbersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Numbers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NumbersFindFirstArgs} args - Arguments to find a Numbers
     * @example
     * // Get one Numbers
     * const numbers = await prisma.numbers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NumbersFindFirstArgs>(args?: SelectSubset<T, NumbersFindFirstArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Numbers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NumbersFindFirstOrThrowArgs} args - Arguments to find a Numbers
     * @example
     * // Get one Numbers
     * const numbers = await prisma.numbers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NumbersFindFirstOrThrowArgs>(args?: SelectSubset<T, NumbersFindFirstOrThrowArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Numbers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NumbersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Numbers
     * const numbers = await prisma.numbers.findMany()
     * 
     * // Get first 10 Numbers
     * const numbers = await prisma.numbers.findMany({ take: 10 })
     * 
     * // Only select the `number`
     * const numbersWithNumberOnly = await prisma.numbers.findMany({ select: { number: true } })
     * 
     */
    findMany<T extends NumbersFindManyArgs>(args?: SelectSubset<T, NumbersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Numbers.
     * @param {NumbersCreateArgs} args - Arguments to create a Numbers.
     * @example
     * // Create one Numbers
     * const Numbers = await prisma.numbers.create({
     *   data: {
     *     // ... data to create a Numbers
     *   }
     * })
     * 
     */
    create<T extends NumbersCreateArgs>(args: SelectSubset<T, NumbersCreateArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Numbers.
     * @param {NumbersCreateManyArgs} args - Arguments to create many Numbers.
     * @example
     * // Create many Numbers
     * const numbers = await prisma.numbers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NumbersCreateManyArgs>(args?: SelectSubset<T, NumbersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Numbers.
     * @param {NumbersDeleteArgs} args - Arguments to delete one Numbers.
     * @example
     * // Delete one Numbers
     * const Numbers = await prisma.numbers.delete({
     *   where: {
     *     // ... filter to delete one Numbers
     *   }
     * })
     * 
     */
    delete<T extends NumbersDeleteArgs>(args: SelectSubset<T, NumbersDeleteArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Numbers.
     * @param {NumbersUpdateArgs} args - Arguments to update one Numbers.
     * @example
     * // Update one Numbers
     * const numbers = await prisma.numbers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NumbersUpdateArgs>(args: SelectSubset<T, NumbersUpdateArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Numbers.
     * @param {NumbersDeleteManyArgs} args - Arguments to filter Numbers to delete.
     * @example
     * // Delete a few Numbers
     * const { count } = await prisma.numbers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NumbersDeleteManyArgs>(args?: SelectSubset<T, NumbersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Numbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NumbersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Numbers
     * const numbers = await prisma.numbers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NumbersUpdateManyArgs>(args: SelectSubset<T, NumbersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Numbers.
     * @param {NumbersUpsertArgs} args - Arguments to update or create a Numbers.
     * @example
     * // Update or create a Numbers
     * const numbers = await prisma.numbers.upsert({
     *   create: {
     *     // ... data to create a Numbers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Numbers we want to update
     *   }
     * })
     */
    upsert<T extends NumbersUpsertArgs>(args: SelectSubset<T, NumbersUpsertArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Numbers that matches the filter.
     * @param {NumbersFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const numbers = await prisma.numbers.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: NumbersFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Numbers.
     * @param {NumbersAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const numbers = await prisma.numbers.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: NumbersAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Numbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NumbersCountArgs} args - Arguments to filter Numbers to count.
     * @example
     * // Count the number of Numbers
     * const count = await prisma.numbers.count({
     *   where: {
     *     // ... the filter for the Numbers we want to count
     *   }
     * })
    **/
    count<T extends NumbersCountArgs>(
      args?: Subset<T, NumbersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NumbersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Numbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NumbersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NumbersAggregateArgs>(args: Subset<T, NumbersAggregateArgs>): Prisma.PrismaPromise<GetNumbersAggregateType<T>>

    /**
     * Group by Numbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NumbersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NumbersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NumbersGroupByArgs['orderBy'] }
        : { orderBy?: NumbersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NumbersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNumbersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Numbers model
   */
  readonly fields: NumbersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Numbers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NumbersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mailbox<T extends Numbers$mailboxArgs<ExtArgs> = {}>(args?: Subset<T, Numbers$mailboxArgs<ExtArgs>>): Prisma__MailboxClient<$Result.GetResult<Prisma.$MailboxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    outgoingCalls<T extends Numbers$outgoingCallsArgs<ExtArgs> = {}>(args?: Subset<T, Numbers$outgoingCallsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    incomingCalls<T extends Numbers$incomingCallsArgs<ExtArgs> = {}>(args?: Subset<T, Numbers$incomingCallsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    guild<T extends Numbers$guildArgs<ExtArgs> = {}>(args?: Subset<T, Numbers$guildArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    phonebook<T extends Numbers$phonebookArgs<ExtArgs> = {}>(args?: Subset<T, Numbers$phonebookArgs<ExtArgs>>): Prisma__PhonebookClient<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Numbers model
   */
  interface NumbersFieldRefs {
    readonly number: FieldRef<"Numbers", 'String'>
    readonly channelID: FieldRef<"Numbers", 'String'>
    readonly guildID: FieldRef<"Numbers", 'String'>
    readonly userID: FieldRef<"Numbers", 'String'>
    readonly blocked: FieldRef<"Numbers", 'String[]'>
    readonly expiry: FieldRef<"Numbers", 'DateTime'>
    readonly mentions: FieldRef<"Numbers", 'String[]'>
    readonly waiting: FieldRef<"Numbers", 'Boolean'>
    readonly createdAt: FieldRef<"Numbers", 'DateTime'>
    readonly fka: FieldRef<"Numbers", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Numbers findUnique
   */
  export type NumbersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    /**
     * Filter, which Numbers to fetch.
     */
    where: NumbersWhereUniqueInput
  }

  /**
   * Numbers findUniqueOrThrow
   */
  export type NumbersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    /**
     * Filter, which Numbers to fetch.
     */
    where: NumbersWhereUniqueInput
  }

  /**
   * Numbers findFirst
   */
  export type NumbersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    /**
     * Filter, which Numbers to fetch.
     */
    where?: NumbersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Numbers to fetch.
     */
    orderBy?: NumbersOrderByWithRelationInput | NumbersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Numbers.
     */
    cursor?: NumbersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Numbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Numbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Numbers.
     */
    distinct?: NumbersScalarFieldEnum | NumbersScalarFieldEnum[]
  }

  /**
   * Numbers findFirstOrThrow
   */
  export type NumbersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    /**
     * Filter, which Numbers to fetch.
     */
    where?: NumbersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Numbers to fetch.
     */
    orderBy?: NumbersOrderByWithRelationInput | NumbersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Numbers.
     */
    cursor?: NumbersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Numbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Numbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Numbers.
     */
    distinct?: NumbersScalarFieldEnum | NumbersScalarFieldEnum[]
  }

  /**
   * Numbers findMany
   */
  export type NumbersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    /**
     * Filter, which Numbers to fetch.
     */
    where?: NumbersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Numbers to fetch.
     */
    orderBy?: NumbersOrderByWithRelationInput | NumbersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Numbers.
     */
    cursor?: NumbersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Numbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Numbers.
     */
    skip?: number
    distinct?: NumbersScalarFieldEnum | NumbersScalarFieldEnum[]
  }

  /**
   * Numbers create
   */
  export type NumbersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    /**
     * The data needed to create a Numbers.
     */
    data: XOR<NumbersCreateInput, NumbersUncheckedCreateInput>
  }

  /**
   * Numbers createMany
   */
  export type NumbersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Numbers.
     */
    data: NumbersCreateManyInput | NumbersCreateManyInput[]
  }

  /**
   * Numbers update
   */
  export type NumbersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    /**
     * The data needed to update a Numbers.
     */
    data: XOR<NumbersUpdateInput, NumbersUncheckedUpdateInput>
    /**
     * Choose, which Numbers to update.
     */
    where: NumbersWhereUniqueInput
  }

  /**
   * Numbers updateMany
   */
  export type NumbersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Numbers.
     */
    data: XOR<NumbersUpdateManyMutationInput, NumbersUncheckedUpdateManyInput>
    /**
     * Filter which Numbers to update
     */
    where?: NumbersWhereInput
    /**
     * Limit how many Numbers to update.
     */
    limit?: number
  }

  /**
   * Numbers upsert
   */
  export type NumbersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    /**
     * The filter to search for the Numbers to update in case it exists.
     */
    where: NumbersWhereUniqueInput
    /**
     * In case the Numbers found by the `where` argument doesn't exist, create a new Numbers with this data.
     */
    create: XOR<NumbersCreateInput, NumbersUncheckedCreateInput>
    /**
     * In case the Numbers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NumbersUpdateInput, NumbersUncheckedUpdateInput>
  }

  /**
   * Numbers delete
   */
  export type NumbersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    /**
     * Filter which Numbers to delete.
     */
    where: NumbersWhereUniqueInput
  }

  /**
   * Numbers deleteMany
   */
  export type NumbersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Numbers to delete
     */
    where?: NumbersWhereInput
    /**
     * Limit how many Numbers to delete.
     */
    limit?: number
  }

  /**
   * Numbers findRaw
   */
  export type NumbersFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Numbers aggregateRaw
   */
  export type NumbersAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Numbers.mailbox
   */
  export type Numbers$mailboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mailbox
     */
    select?: MailboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mailbox
     */
    omit?: MailboxOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MailboxInclude<ExtArgs> | null
    where?: MailboxWhereInput
  }

  /**
   * Numbers.outgoingCalls
   */
  export type Numbers$outgoingCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    where?: ActiveCallsWhereInput
    orderBy?: ActiveCallsOrderByWithRelationInput | ActiveCallsOrderByWithRelationInput[]
    cursor?: ActiveCallsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveCallsScalarFieldEnum | ActiveCallsScalarFieldEnum[]
  }

  /**
   * Numbers.incomingCalls
   */
  export type Numbers$incomingCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    where?: ActiveCallsWhereInput
    orderBy?: ActiveCallsOrderByWithRelationInput | ActiveCallsOrderByWithRelationInput[]
    cursor?: ActiveCallsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveCallsScalarFieldEnum | ActiveCallsScalarFieldEnum[]
  }

  /**
   * Numbers.guild
   */
  export type Numbers$guildArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    where?: GuildConfigsWhereInput
  }

  /**
   * Numbers.phonebook
   */
  export type Numbers$phonebookArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    where?: PhonebookWhereInput
  }

  /**
   * Numbers without action
   */
  export type NumbersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
  }


  /**
   * Model CallMessages
   */

  export type AggregateCallMessages = {
    _count: CallMessagesCountAggregateOutputType | null
    _min: CallMessagesMinAggregateOutputType | null
    _max: CallMessagesMaxAggregateOutputType | null
  }

  export type CallMessagesMinAggregateOutputType = {
    id: string | null
    callID: string | null
    forwardedMessageID: string | null
    originalMessageID: string | null
    sentAt: Date | null
    sender: string | null
  }

  export type CallMessagesMaxAggregateOutputType = {
    id: string | null
    callID: string | null
    forwardedMessageID: string | null
    originalMessageID: string | null
    sentAt: Date | null
    sender: string | null
  }

  export type CallMessagesCountAggregateOutputType = {
    id: number
    callID: number
    forwardedMessageID: number
    originalMessageID: number
    sentAt: number
    sender: number
    _all: number
  }


  export type CallMessagesMinAggregateInputType = {
    id?: true
    callID?: true
    forwardedMessageID?: true
    originalMessageID?: true
    sentAt?: true
    sender?: true
  }

  export type CallMessagesMaxAggregateInputType = {
    id?: true
    callID?: true
    forwardedMessageID?: true
    originalMessageID?: true
    sentAt?: true
    sender?: true
  }

  export type CallMessagesCountAggregateInputType = {
    id?: true
    callID?: true
    forwardedMessageID?: true
    originalMessageID?: true
    sentAt?: true
    sender?: true
    _all?: true
  }

  export type CallMessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallMessages to aggregate.
     */
    where?: CallMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallMessages to fetch.
     */
    orderBy?: CallMessagesOrderByWithRelationInput | CallMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallMessages
    **/
    _count?: true | CallMessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallMessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallMessagesMaxAggregateInputType
  }

  export type GetCallMessagesAggregateType<T extends CallMessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateCallMessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallMessages[P]>
      : GetScalarType<T[P], AggregateCallMessages[P]>
  }




  export type CallMessagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallMessagesWhereInput
    orderBy?: CallMessagesOrderByWithAggregationInput | CallMessagesOrderByWithAggregationInput[]
    by: CallMessagesScalarFieldEnum[] | CallMessagesScalarFieldEnum
    having?: CallMessagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallMessagesCountAggregateInputType | true
    _min?: CallMessagesMinAggregateInputType
    _max?: CallMessagesMaxAggregateInputType
  }

  export type CallMessagesGroupByOutputType = {
    id: string
    callID: string
    forwardedMessageID: string
    originalMessageID: string
    sentAt: Date
    sender: string
    _count: CallMessagesCountAggregateOutputType | null
    _min: CallMessagesMinAggregateOutputType | null
    _max: CallMessagesMaxAggregateOutputType | null
  }

  type GetCallMessagesGroupByPayload<T extends CallMessagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallMessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallMessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallMessagesGroupByOutputType[P]>
            : GetScalarType<T[P], CallMessagesGroupByOutputType[P]>
        }
      >
    >


  export type CallMessagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callID?: boolean
    forwardedMessageID?: boolean
    originalMessageID?: boolean
    sentAt?: boolean
    sender?: boolean
  }, ExtArgs["result"]["callMessages"]>



  export type CallMessagesSelectScalar = {
    id?: boolean
    callID?: boolean
    forwardedMessageID?: boolean
    originalMessageID?: boolean
    sentAt?: boolean
    sender?: boolean
  }

  export type CallMessagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "callID" | "forwardedMessageID" | "originalMessageID" | "sentAt" | "sender", ExtArgs["result"]["callMessages"]>

  export type $CallMessagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallMessages"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      callID: string
      forwardedMessageID: string
      originalMessageID: string
      sentAt: Date
      sender: string
    }, ExtArgs["result"]["callMessages"]>
    composites: {}
  }

  type CallMessagesGetPayload<S extends boolean | null | undefined | CallMessagesDefaultArgs> = $Result.GetResult<Prisma.$CallMessagesPayload, S>

  type CallMessagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CallMessagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallMessagesCountAggregateInputType | true
    }

  export interface CallMessagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallMessages'], meta: { name: 'CallMessages' } }
    /**
     * Find zero or one CallMessages that matches the filter.
     * @param {CallMessagesFindUniqueArgs} args - Arguments to find a CallMessages
     * @example
     * // Get one CallMessages
     * const callMessages = await prisma.callMessages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallMessagesFindUniqueArgs>(args: SelectSubset<T, CallMessagesFindUniqueArgs<ExtArgs>>): Prisma__CallMessagesClient<$Result.GetResult<Prisma.$CallMessagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CallMessages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CallMessagesFindUniqueOrThrowArgs} args - Arguments to find a CallMessages
     * @example
     * // Get one CallMessages
     * const callMessages = await prisma.callMessages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallMessagesFindUniqueOrThrowArgs>(args: SelectSubset<T, CallMessagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallMessagesClient<$Result.GetResult<Prisma.$CallMessagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallMessagesFindFirstArgs} args - Arguments to find a CallMessages
     * @example
     * // Get one CallMessages
     * const callMessages = await prisma.callMessages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallMessagesFindFirstArgs>(args?: SelectSubset<T, CallMessagesFindFirstArgs<ExtArgs>>): Prisma__CallMessagesClient<$Result.GetResult<Prisma.$CallMessagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallMessages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallMessagesFindFirstOrThrowArgs} args - Arguments to find a CallMessages
     * @example
     * // Get one CallMessages
     * const callMessages = await prisma.callMessages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallMessagesFindFirstOrThrowArgs>(args?: SelectSubset<T, CallMessagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallMessagesClient<$Result.GetResult<Prisma.$CallMessagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CallMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallMessagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallMessages
     * const callMessages = await prisma.callMessages.findMany()
     * 
     * // Get first 10 CallMessages
     * const callMessages = await prisma.callMessages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callMessagesWithIdOnly = await prisma.callMessages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallMessagesFindManyArgs>(args?: SelectSubset<T, CallMessagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallMessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CallMessages.
     * @param {CallMessagesCreateArgs} args - Arguments to create a CallMessages.
     * @example
     * // Create one CallMessages
     * const CallMessages = await prisma.callMessages.create({
     *   data: {
     *     // ... data to create a CallMessages
     *   }
     * })
     * 
     */
    create<T extends CallMessagesCreateArgs>(args: SelectSubset<T, CallMessagesCreateArgs<ExtArgs>>): Prisma__CallMessagesClient<$Result.GetResult<Prisma.$CallMessagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CallMessages.
     * @param {CallMessagesCreateManyArgs} args - Arguments to create many CallMessages.
     * @example
     * // Create many CallMessages
     * const callMessages = await prisma.callMessages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallMessagesCreateManyArgs>(args?: SelectSubset<T, CallMessagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CallMessages.
     * @param {CallMessagesDeleteArgs} args - Arguments to delete one CallMessages.
     * @example
     * // Delete one CallMessages
     * const CallMessages = await prisma.callMessages.delete({
     *   where: {
     *     // ... filter to delete one CallMessages
     *   }
     * })
     * 
     */
    delete<T extends CallMessagesDeleteArgs>(args: SelectSubset<T, CallMessagesDeleteArgs<ExtArgs>>): Prisma__CallMessagesClient<$Result.GetResult<Prisma.$CallMessagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CallMessages.
     * @param {CallMessagesUpdateArgs} args - Arguments to update one CallMessages.
     * @example
     * // Update one CallMessages
     * const callMessages = await prisma.callMessages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallMessagesUpdateArgs>(args: SelectSubset<T, CallMessagesUpdateArgs<ExtArgs>>): Prisma__CallMessagesClient<$Result.GetResult<Prisma.$CallMessagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CallMessages.
     * @param {CallMessagesDeleteManyArgs} args - Arguments to filter CallMessages to delete.
     * @example
     * // Delete a few CallMessages
     * const { count } = await prisma.callMessages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallMessagesDeleteManyArgs>(args?: SelectSubset<T, CallMessagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallMessagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallMessages
     * const callMessages = await prisma.callMessages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallMessagesUpdateManyArgs>(args: SelectSubset<T, CallMessagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CallMessages.
     * @param {CallMessagesUpsertArgs} args - Arguments to update or create a CallMessages.
     * @example
     * // Update or create a CallMessages
     * const callMessages = await prisma.callMessages.upsert({
     *   create: {
     *     // ... data to create a CallMessages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallMessages we want to update
     *   }
     * })
     */
    upsert<T extends CallMessagesUpsertArgs>(args: SelectSubset<T, CallMessagesUpsertArgs<ExtArgs>>): Prisma__CallMessagesClient<$Result.GetResult<Prisma.$CallMessagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CallMessages that matches the filter.
     * @param {CallMessagesFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const callMessages = await prisma.callMessages.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CallMessagesFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CallMessages.
     * @param {CallMessagesAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const callMessages = await prisma.callMessages.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CallMessagesAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CallMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallMessagesCountArgs} args - Arguments to filter CallMessages to count.
     * @example
     * // Count the number of CallMessages
     * const count = await prisma.callMessages.count({
     *   where: {
     *     // ... the filter for the CallMessages we want to count
     *   }
     * })
    **/
    count<T extends CallMessagesCountArgs>(
      args?: Subset<T, CallMessagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallMessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallMessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallMessagesAggregateArgs>(args: Subset<T, CallMessagesAggregateArgs>): Prisma.PrismaPromise<GetCallMessagesAggregateType<T>>

    /**
     * Group by CallMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallMessagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CallMessagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallMessagesGroupByArgs['orderBy'] }
        : { orderBy?: CallMessagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CallMessagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallMessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallMessages model
   */
  readonly fields: CallMessagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallMessages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallMessagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CallMessages model
   */
  interface CallMessagesFieldRefs {
    readonly id: FieldRef<"CallMessages", 'String'>
    readonly callID: FieldRef<"CallMessages", 'String'>
    readonly forwardedMessageID: FieldRef<"CallMessages", 'String'>
    readonly originalMessageID: FieldRef<"CallMessages", 'String'>
    readonly sentAt: FieldRef<"CallMessages", 'DateTime'>
    readonly sender: FieldRef<"CallMessages", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CallMessages findUnique
   */
  export type CallMessagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
    /**
     * Filter, which CallMessages to fetch.
     */
    where: CallMessagesWhereUniqueInput
  }

  /**
   * CallMessages findUniqueOrThrow
   */
  export type CallMessagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
    /**
     * Filter, which CallMessages to fetch.
     */
    where: CallMessagesWhereUniqueInput
  }

  /**
   * CallMessages findFirst
   */
  export type CallMessagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
    /**
     * Filter, which CallMessages to fetch.
     */
    where?: CallMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallMessages to fetch.
     */
    orderBy?: CallMessagesOrderByWithRelationInput | CallMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallMessages.
     */
    cursor?: CallMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallMessages.
     */
    distinct?: CallMessagesScalarFieldEnum | CallMessagesScalarFieldEnum[]
  }

  /**
   * CallMessages findFirstOrThrow
   */
  export type CallMessagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
    /**
     * Filter, which CallMessages to fetch.
     */
    where?: CallMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallMessages to fetch.
     */
    orderBy?: CallMessagesOrderByWithRelationInput | CallMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallMessages.
     */
    cursor?: CallMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallMessages.
     */
    distinct?: CallMessagesScalarFieldEnum | CallMessagesScalarFieldEnum[]
  }

  /**
   * CallMessages findMany
   */
  export type CallMessagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
    /**
     * Filter, which CallMessages to fetch.
     */
    where?: CallMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallMessages to fetch.
     */
    orderBy?: CallMessagesOrderByWithRelationInput | CallMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallMessages.
     */
    cursor?: CallMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallMessages.
     */
    skip?: number
    distinct?: CallMessagesScalarFieldEnum | CallMessagesScalarFieldEnum[]
  }

  /**
   * CallMessages create
   */
  export type CallMessagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
    /**
     * The data needed to create a CallMessages.
     */
    data: XOR<CallMessagesCreateInput, CallMessagesUncheckedCreateInput>
  }

  /**
   * CallMessages createMany
   */
  export type CallMessagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallMessages.
     */
    data: CallMessagesCreateManyInput | CallMessagesCreateManyInput[]
  }

  /**
   * CallMessages update
   */
  export type CallMessagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
    /**
     * The data needed to update a CallMessages.
     */
    data: XOR<CallMessagesUpdateInput, CallMessagesUncheckedUpdateInput>
    /**
     * Choose, which CallMessages to update.
     */
    where: CallMessagesWhereUniqueInput
  }

  /**
   * CallMessages updateMany
   */
  export type CallMessagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallMessages.
     */
    data: XOR<CallMessagesUpdateManyMutationInput, CallMessagesUncheckedUpdateManyInput>
    /**
     * Filter which CallMessages to update
     */
    where?: CallMessagesWhereInput
    /**
     * Limit how many CallMessages to update.
     */
    limit?: number
  }

  /**
   * CallMessages upsert
   */
  export type CallMessagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
    /**
     * The filter to search for the CallMessages to update in case it exists.
     */
    where: CallMessagesWhereUniqueInput
    /**
     * In case the CallMessages found by the `where` argument doesn't exist, create a new CallMessages with this data.
     */
    create: XOR<CallMessagesCreateInput, CallMessagesUncheckedCreateInput>
    /**
     * In case the CallMessages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallMessagesUpdateInput, CallMessagesUncheckedUpdateInput>
  }

  /**
   * CallMessages delete
   */
  export type CallMessagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
    /**
     * Filter which CallMessages to delete.
     */
    where: CallMessagesWhereUniqueInput
  }

  /**
   * CallMessages deleteMany
   */
  export type CallMessagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallMessages to delete
     */
    where?: CallMessagesWhereInput
    /**
     * Limit how many CallMessages to delete.
     */
    limit?: number
  }

  /**
   * CallMessages findRaw
   */
  export type CallMessagesFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CallMessages aggregateRaw
   */
  export type CallMessagesAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CallMessages without action
   */
  export type CallMessagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallMessages
     */
    select?: CallMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallMessages
     */
    omit?: CallMessagesOmit<ExtArgs> | null
  }


  /**
   * Model ActiveCalls
   */

  export type AggregateActiveCalls = {
    _count: ActiveCallsCountAggregateOutputType | null
    _min: ActiveCallsMinAggregateOutputType | null
    _max: ActiveCallsMaxAggregateOutputType | null
  }

  export type ActiveCallsMinAggregateOutputType = {
    id: string | null
    toNum: string | null
    fromNum: string | null
    randomCall: boolean | null
  }

  export type ActiveCallsMaxAggregateOutputType = {
    id: string | null
    toNum: string | null
    fromNum: string | null
    randomCall: boolean | null
  }

  export type ActiveCallsCountAggregateOutputType = {
    id: number
    toNum: number
    fromNum: number
    randomCall: number
    _all: number
  }


  export type ActiveCallsMinAggregateInputType = {
    id?: true
    toNum?: true
    fromNum?: true
    randomCall?: true
  }

  export type ActiveCallsMaxAggregateInputType = {
    id?: true
    toNum?: true
    fromNum?: true
    randomCall?: true
  }

  export type ActiveCallsCountAggregateInputType = {
    id?: true
    toNum?: true
    fromNum?: true
    randomCall?: true
    _all?: true
  }

  export type ActiveCallsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveCalls to aggregate.
     */
    where?: ActiveCallsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveCalls to fetch.
     */
    orderBy?: ActiveCallsOrderByWithRelationInput | ActiveCallsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActiveCallsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActiveCalls
    **/
    _count?: true | ActiveCallsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActiveCallsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActiveCallsMaxAggregateInputType
  }

  export type GetActiveCallsAggregateType<T extends ActiveCallsAggregateArgs> = {
        [P in keyof T & keyof AggregateActiveCalls]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActiveCalls[P]>
      : GetScalarType<T[P], AggregateActiveCalls[P]>
  }




  export type ActiveCallsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveCallsWhereInput
    orderBy?: ActiveCallsOrderByWithAggregationInput | ActiveCallsOrderByWithAggregationInput[]
    by: ActiveCallsScalarFieldEnum[] | ActiveCallsScalarFieldEnum
    having?: ActiveCallsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActiveCallsCountAggregateInputType | true
    _min?: ActiveCallsMinAggregateInputType
    _max?: ActiveCallsMaxAggregateInputType
  }

  export type ActiveCallsGroupByOutputType = {
    id: string
    toNum: string
    fromNum: string
    randomCall: boolean
    _count: ActiveCallsCountAggregateOutputType | null
    _min: ActiveCallsMinAggregateOutputType | null
    _max: ActiveCallsMaxAggregateOutputType | null
  }

  type GetActiveCallsGroupByPayload<T extends ActiveCallsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActiveCallsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActiveCallsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActiveCallsGroupByOutputType[P]>
            : GetScalarType<T[P], ActiveCallsGroupByOutputType[P]>
        }
      >
    >


  export type ActiveCallsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    toNum?: boolean
    fromNum?: boolean
    pickedUp?: boolean | atAndByDefaultArgs<ExtArgs>
    randomCall?: boolean
    started?: boolean | atAndByDefaultArgs<ExtArgs>
    ended?: boolean | atAndByDefaultArgs<ExtArgs>
    hold?: boolean | onHoldDefaultArgs<ExtArgs>
    to?: boolean | ActiveCalls$toArgs<ExtArgs>
    from?: boolean | ActiveCalls$fromArgs<ExtArgs>
  }, ExtArgs["result"]["activeCalls"]>



  export type ActiveCallsSelectScalar = {
    id?: boolean
    toNum?: boolean
    fromNum?: boolean
    randomCall?: boolean
  }

  export type ActiveCallsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "toNum" | "fromNum" | "pickedUp" | "randomCall" | "started" | "ended" | "hold", ExtArgs["result"]["activeCalls"]>
  export type ActiveCallsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    to?: boolean | ActiveCalls$toArgs<ExtArgs>
    from?: boolean | ActiveCalls$fromArgs<ExtArgs>
  }

  export type $ActiveCallsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActiveCalls"
    objects: {
      to: Prisma.$NumbersPayload<ExtArgs> | null
      from: Prisma.$NumbersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      toNum: string
      fromNum: string
      randomCall: boolean
    }, ExtArgs["result"]["activeCalls"]>
    composites: {
      pickedUp: Prisma.$atAndByPayload | null
      started: Prisma.$atAndByPayload
      ended: Prisma.$atAndByPayload | null
      hold: Prisma.$onHoldPayload
    }
  }

  type ActiveCallsGetPayload<S extends boolean | null | undefined | ActiveCallsDefaultArgs> = $Result.GetResult<Prisma.$ActiveCallsPayload, S>

  type ActiveCallsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActiveCallsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActiveCallsCountAggregateInputType | true
    }

  export interface ActiveCallsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActiveCalls'], meta: { name: 'ActiveCalls' } }
    /**
     * Find zero or one ActiveCalls that matches the filter.
     * @param {ActiveCallsFindUniqueArgs} args - Arguments to find a ActiveCalls
     * @example
     * // Get one ActiveCalls
     * const activeCalls = await prisma.activeCalls.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActiveCallsFindUniqueArgs>(args: SelectSubset<T, ActiveCallsFindUniqueArgs<ExtArgs>>): Prisma__ActiveCallsClient<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActiveCalls that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActiveCallsFindUniqueOrThrowArgs} args - Arguments to find a ActiveCalls
     * @example
     * // Get one ActiveCalls
     * const activeCalls = await prisma.activeCalls.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActiveCallsFindUniqueOrThrowArgs>(args: SelectSubset<T, ActiveCallsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActiveCallsClient<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActiveCalls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveCallsFindFirstArgs} args - Arguments to find a ActiveCalls
     * @example
     * // Get one ActiveCalls
     * const activeCalls = await prisma.activeCalls.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActiveCallsFindFirstArgs>(args?: SelectSubset<T, ActiveCallsFindFirstArgs<ExtArgs>>): Prisma__ActiveCallsClient<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActiveCalls that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveCallsFindFirstOrThrowArgs} args - Arguments to find a ActiveCalls
     * @example
     * // Get one ActiveCalls
     * const activeCalls = await prisma.activeCalls.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActiveCallsFindFirstOrThrowArgs>(args?: SelectSubset<T, ActiveCallsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActiveCallsClient<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActiveCalls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveCallsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActiveCalls
     * const activeCalls = await prisma.activeCalls.findMany()
     * 
     * // Get first 10 ActiveCalls
     * const activeCalls = await prisma.activeCalls.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activeCallsWithIdOnly = await prisma.activeCalls.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActiveCallsFindManyArgs>(args?: SelectSubset<T, ActiveCallsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActiveCalls.
     * @param {ActiveCallsCreateArgs} args - Arguments to create a ActiveCalls.
     * @example
     * // Create one ActiveCalls
     * const ActiveCalls = await prisma.activeCalls.create({
     *   data: {
     *     // ... data to create a ActiveCalls
     *   }
     * })
     * 
     */
    create<T extends ActiveCallsCreateArgs>(args: SelectSubset<T, ActiveCallsCreateArgs<ExtArgs>>): Prisma__ActiveCallsClient<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActiveCalls.
     * @param {ActiveCallsCreateManyArgs} args - Arguments to create many ActiveCalls.
     * @example
     * // Create many ActiveCalls
     * const activeCalls = await prisma.activeCalls.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActiveCallsCreateManyArgs>(args?: SelectSubset<T, ActiveCallsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ActiveCalls.
     * @param {ActiveCallsDeleteArgs} args - Arguments to delete one ActiveCalls.
     * @example
     * // Delete one ActiveCalls
     * const ActiveCalls = await prisma.activeCalls.delete({
     *   where: {
     *     // ... filter to delete one ActiveCalls
     *   }
     * })
     * 
     */
    delete<T extends ActiveCallsDeleteArgs>(args: SelectSubset<T, ActiveCallsDeleteArgs<ExtArgs>>): Prisma__ActiveCallsClient<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActiveCalls.
     * @param {ActiveCallsUpdateArgs} args - Arguments to update one ActiveCalls.
     * @example
     * // Update one ActiveCalls
     * const activeCalls = await prisma.activeCalls.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActiveCallsUpdateArgs>(args: SelectSubset<T, ActiveCallsUpdateArgs<ExtArgs>>): Prisma__ActiveCallsClient<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActiveCalls.
     * @param {ActiveCallsDeleteManyArgs} args - Arguments to filter ActiveCalls to delete.
     * @example
     * // Delete a few ActiveCalls
     * const { count } = await prisma.activeCalls.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActiveCallsDeleteManyArgs>(args?: SelectSubset<T, ActiveCallsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveCallsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActiveCalls
     * const activeCalls = await prisma.activeCalls.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActiveCallsUpdateManyArgs>(args: SelectSubset<T, ActiveCallsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActiveCalls.
     * @param {ActiveCallsUpsertArgs} args - Arguments to update or create a ActiveCalls.
     * @example
     * // Update or create a ActiveCalls
     * const activeCalls = await prisma.activeCalls.upsert({
     *   create: {
     *     // ... data to create a ActiveCalls
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActiveCalls we want to update
     *   }
     * })
     */
    upsert<T extends ActiveCallsUpsertArgs>(args: SelectSubset<T, ActiveCallsUpsertArgs<ExtArgs>>): Prisma__ActiveCallsClient<$Result.GetResult<Prisma.$ActiveCallsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActiveCalls that matches the filter.
     * @param {ActiveCallsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const activeCalls = await prisma.activeCalls.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ActiveCallsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ActiveCalls.
     * @param {ActiveCallsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const activeCalls = await prisma.activeCalls.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ActiveCallsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ActiveCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveCallsCountArgs} args - Arguments to filter ActiveCalls to count.
     * @example
     * // Count the number of ActiveCalls
     * const count = await prisma.activeCalls.count({
     *   where: {
     *     // ... the filter for the ActiveCalls we want to count
     *   }
     * })
    **/
    count<T extends ActiveCallsCountArgs>(
      args?: Subset<T, ActiveCallsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActiveCallsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActiveCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveCallsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActiveCallsAggregateArgs>(args: Subset<T, ActiveCallsAggregateArgs>): Prisma.PrismaPromise<GetActiveCallsAggregateType<T>>

    /**
     * Group by ActiveCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveCallsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActiveCallsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActiveCallsGroupByArgs['orderBy'] }
        : { orderBy?: ActiveCallsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActiveCallsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActiveCallsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActiveCalls model
   */
  readonly fields: ActiveCallsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActiveCalls.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActiveCallsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    to<T extends ActiveCalls$toArgs<ExtArgs> = {}>(args?: Subset<T, ActiveCalls$toArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    from<T extends ActiveCalls$fromArgs<ExtArgs> = {}>(args?: Subset<T, ActiveCalls$fromArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActiveCalls model
   */
  interface ActiveCallsFieldRefs {
    readonly id: FieldRef<"ActiveCalls", 'String'>
    readonly toNum: FieldRef<"ActiveCalls", 'String'>
    readonly fromNum: FieldRef<"ActiveCalls", 'String'>
    readonly randomCall: FieldRef<"ActiveCalls", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ActiveCalls findUnique
   */
  export type ActiveCallsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    /**
     * Filter, which ActiveCalls to fetch.
     */
    where: ActiveCallsWhereUniqueInput
  }

  /**
   * ActiveCalls findUniqueOrThrow
   */
  export type ActiveCallsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    /**
     * Filter, which ActiveCalls to fetch.
     */
    where: ActiveCallsWhereUniqueInput
  }

  /**
   * ActiveCalls findFirst
   */
  export type ActiveCallsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    /**
     * Filter, which ActiveCalls to fetch.
     */
    where?: ActiveCallsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveCalls to fetch.
     */
    orderBy?: ActiveCallsOrderByWithRelationInput | ActiveCallsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveCalls.
     */
    cursor?: ActiveCallsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveCalls.
     */
    distinct?: ActiveCallsScalarFieldEnum | ActiveCallsScalarFieldEnum[]
  }

  /**
   * ActiveCalls findFirstOrThrow
   */
  export type ActiveCallsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    /**
     * Filter, which ActiveCalls to fetch.
     */
    where?: ActiveCallsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveCalls to fetch.
     */
    orderBy?: ActiveCallsOrderByWithRelationInput | ActiveCallsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveCalls.
     */
    cursor?: ActiveCallsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveCalls.
     */
    distinct?: ActiveCallsScalarFieldEnum | ActiveCallsScalarFieldEnum[]
  }

  /**
   * ActiveCalls findMany
   */
  export type ActiveCallsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    /**
     * Filter, which ActiveCalls to fetch.
     */
    where?: ActiveCallsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveCalls to fetch.
     */
    orderBy?: ActiveCallsOrderByWithRelationInput | ActiveCallsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActiveCalls.
     */
    cursor?: ActiveCallsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveCalls.
     */
    skip?: number
    distinct?: ActiveCallsScalarFieldEnum | ActiveCallsScalarFieldEnum[]
  }

  /**
   * ActiveCalls create
   */
  export type ActiveCallsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    /**
     * The data needed to create a ActiveCalls.
     */
    data: XOR<ActiveCallsCreateInput, ActiveCallsUncheckedCreateInput>
  }

  /**
   * ActiveCalls createMany
   */
  export type ActiveCallsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActiveCalls.
     */
    data: ActiveCallsCreateManyInput | ActiveCallsCreateManyInput[]
  }

  /**
   * ActiveCalls update
   */
  export type ActiveCallsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    /**
     * The data needed to update a ActiveCalls.
     */
    data: XOR<ActiveCallsUpdateInput, ActiveCallsUncheckedUpdateInput>
    /**
     * Choose, which ActiveCalls to update.
     */
    where: ActiveCallsWhereUniqueInput
  }

  /**
   * ActiveCalls updateMany
   */
  export type ActiveCallsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActiveCalls.
     */
    data: XOR<ActiveCallsUpdateManyMutationInput, ActiveCallsUncheckedUpdateManyInput>
    /**
     * Filter which ActiveCalls to update
     */
    where?: ActiveCallsWhereInput
    /**
     * Limit how many ActiveCalls to update.
     */
    limit?: number
  }

  /**
   * ActiveCalls upsert
   */
  export type ActiveCallsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    /**
     * The filter to search for the ActiveCalls to update in case it exists.
     */
    where: ActiveCallsWhereUniqueInput
    /**
     * In case the ActiveCalls found by the `where` argument doesn't exist, create a new ActiveCalls with this data.
     */
    create: XOR<ActiveCallsCreateInput, ActiveCallsUncheckedCreateInput>
    /**
     * In case the ActiveCalls was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActiveCallsUpdateInput, ActiveCallsUncheckedUpdateInput>
  }

  /**
   * ActiveCalls delete
   */
  export type ActiveCallsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
    /**
     * Filter which ActiveCalls to delete.
     */
    where: ActiveCallsWhereUniqueInput
  }

  /**
   * ActiveCalls deleteMany
   */
  export type ActiveCallsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveCalls to delete
     */
    where?: ActiveCallsWhereInput
    /**
     * Limit how many ActiveCalls to delete.
     */
    limit?: number
  }

  /**
   * ActiveCalls findRaw
   */
  export type ActiveCallsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ActiveCalls aggregateRaw
   */
  export type ActiveCallsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ActiveCalls.to
   */
  export type ActiveCalls$toArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    where?: NumbersWhereInput
  }

  /**
   * ActiveCalls.from
   */
  export type ActiveCalls$fromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    where?: NumbersWhereInput
  }

  /**
   * ActiveCalls without action
   */
  export type ActiveCallsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveCalls
     */
    select?: ActiveCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveCalls
     */
    omit?: ActiveCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveCallsInclude<ExtArgs> | null
  }


  /**
   * Model ArchivedCalls
   */

  export type AggregateArchivedCalls = {
    _count: ArchivedCallsCountAggregateOutputType | null
    _min: ArchivedCallsMinAggregateOutputType | null
    _max: ArchivedCallsMaxAggregateOutputType | null
  }

  export type ArchivedCallsMinAggregateOutputType = {
    id: string | null
    toNum: string | null
    fromNum: string | null
    randomCall: boolean | null
  }

  export type ArchivedCallsMaxAggregateOutputType = {
    id: string | null
    toNum: string | null
    fromNum: string | null
    randomCall: boolean | null
  }

  export type ArchivedCallsCountAggregateOutputType = {
    id: number
    toNum: number
    fromNum: number
    randomCall: number
    _all: number
  }


  export type ArchivedCallsMinAggregateInputType = {
    id?: true
    toNum?: true
    fromNum?: true
    randomCall?: true
  }

  export type ArchivedCallsMaxAggregateInputType = {
    id?: true
    toNum?: true
    fromNum?: true
    randomCall?: true
  }

  export type ArchivedCallsCountAggregateInputType = {
    id?: true
    toNum?: true
    fromNum?: true
    randomCall?: true
    _all?: true
  }

  export type ArchivedCallsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArchivedCalls to aggregate.
     */
    where?: ArchivedCallsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArchivedCalls to fetch.
     */
    orderBy?: ArchivedCallsOrderByWithRelationInput | ArchivedCallsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArchivedCallsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArchivedCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArchivedCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArchivedCalls
    **/
    _count?: true | ArchivedCallsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArchivedCallsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArchivedCallsMaxAggregateInputType
  }

  export type GetArchivedCallsAggregateType<T extends ArchivedCallsAggregateArgs> = {
        [P in keyof T & keyof AggregateArchivedCalls]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArchivedCalls[P]>
      : GetScalarType<T[P], AggregateArchivedCalls[P]>
  }




  export type ArchivedCallsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArchivedCallsWhereInput
    orderBy?: ArchivedCallsOrderByWithAggregationInput | ArchivedCallsOrderByWithAggregationInput[]
    by: ArchivedCallsScalarFieldEnum[] | ArchivedCallsScalarFieldEnum
    having?: ArchivedCallsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArchivedCallsCountAggregateInputType | true
    _min?: ArchivedCallsMinAggregateInputType
    _max?: ArchivedCallsMaxAggregateInputType
  }

  export type ArchivedCallsGroupByOutputType = {
    id: string
    toNum: string
    fromNum: string
    randomCall: boolean
    _count: ArchivedCallsCountAggregateOutputType | null
    _min: ArchivedCallsMinAggregateOutputType | null
    _max: ArchivedCallsMaxAggregateOutputType | null
  }

  type GetArchivedCallsGroupByPayload<T extends ArchivedCallsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArchivedCallsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArchivedCallsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArchivedCallsGroupByOutputType[P]>
            : GetScalarType<T[P], ArchivedCallsGroupByOutputType[P]>
        }
      >
    >


  export type ArchivedCallsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    toNum?: boolean
    fromNum?: boolean
    pickedUp?: boolean | atAndByDefaultArgs<ExtArgs>
    randomCall?: boolean
    started?: boolean | atAndByDefaultArgs<ExtArgs>
    ended?: boolean | atAndByDefaultArgs<ExtArgs>
    hold?: boolean | onHoldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["archivedCalls"]>



  export type ArchivedCallsSelectScalar = {
    id?: boolean
    toNum?: boolean
    fromNum?: boolean
    randomCall?: boolean
  }

  export type ArchivedCallsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "toNum" | "fromNum" | "pickedUp" | "randomCall" | "started" | "ended" | "hold", ExtArgs["result"]["archivedCalls"]>
  export type ArchivedCallsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ArchivedCallsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArchivedCalls"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      toNum: string
      fromNum: string
      randomCall: boolean
    }, ExtArgs["result"]["archivedCalls"]>
    composites: {
      pickedUp: Prisma.$atAndByPayload | null
      started: Prisma.$atAndByPayload
      ended: Prisma.$atAndByPayload
      hold: Prisma.$onHoldPayload
    }
  }

  type ArchivedCallsGetPayload<S extends boolean | null | undefined | ArchivedCallsDefaultArgs> = $Result.GetResult<Prisma.$ArchivedCallsPayload, S>

  type ArchivedCallsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArchivedCallsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArchivedCallsCountAggregateInputType | true
    }

  export interface ArchivedCallsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArchivedCalls'], meta: { name: 'ArchivedCalls' } }
    /**
     * Find zero or one ArchivedCalls that matches the filter.
     * @param {ArchivedCallsFindUniqueArgs} args - Arguments to find a ArchivedCalls
     * @example
     * // Get one ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArchivedCallsFindUniqueArgs>(args: SelectSubset<T, ArchivedCallsFindUniqueArgs<ExtArgs>>): Prisma__ArchivedCallsClient<$Result.GetResult<Prisma.$ArchivedCallsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArchivedCalls that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArchivedCallsFindUniqueOrThrowArgs} args - Arguments to find a ArchivedCalls
     * @example
     * // Get one ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArchivedCallsFindUniqueOrThrowArgs>(args: SelectSubset<T, ArchivedCallsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArchivedCallsClient<$Result.GetResult<Prisma.$ArchivedCallsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArchivedCalls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchivedCallsFindFirstArgs} args - Arguments to find a ArchivedCalls
     * @example
     * // Get one ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArchivedCallsFindFirstArgs>(args?: SelectSubset<T, ArchivedCallsFindFirstArgs<ExtArgs>>): Prisma__ArchivedCallsClient<$Result.GetResult<Prisma.$ArchivedCallsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArchivedCalls that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchivedCallsFindFirstOrThrowArgs} args - Arguments to find a ArchivedCalls
     * @example
     * // Get one ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArchivedCallsFindFirstOrThrowArgs>(args?: SelectSubset<T, ArchivedCallsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArchivedCallsClient<$Result.GetResult<Prisma.$ArchivedCallsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArchivedCalls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchivedCallsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.findMany()
     * 
     * // Get first 10 ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const archivedCallsWithIdOnly = await prisma.archivedCalls.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArchivedCallsFindManyArgs>(args?: SelectSubset<T, ArchivedCallsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArchivedCallsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArchivedCalls.
     * @param {ArchivedCallsCreateArgs} args - Arguments to create a ArchivedCalls.
     * @example
     * // Create one ArchivedCalls
     * const ArchivedCalls = await prisma.archivedCalls.create({
     *   data: {
     *     // ... data to create a ArchivedCalls
     *   }
     * })
     * 
     */
    create<T extends ArchivedCallsCreateArgs>(args: SelectSubset<T, ArchivedCallsCreateArgs<ExtArgs>>): Prisma__ArchivedCallsClient<$Result.GetResult<Prisma.$ArchivedCallsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArchivedCalls.
     * @param {ArchivedCallsCreateManyArgs} args - Arguments to create many ArchivedCalls.
     * @example
     * // Create many ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArchivedCallsCreateManyArgs>(args?: SelectSubset<T, ArchivedCallsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ArchivedCalls.
     * @param {ArchivedCallsDeleteArgs} args - Arguments to delete one ArchivedCalls.
     * @example
     * // Delete one ArchivedCalls
     * const ArchivedCalls = await prisma.archivedCalls.delete({
     *   where: {
     *     // ... filter to delete one ArchivedCalls
     *   }
     * })
     * 
     */
    delete<T extends ArchivedCallsDeleteArgs>(args: SelectSubset<T, ArchivedCallsDeleteArgs<ExtArgs>>): Prisma__ArchivedCallsClient<$Result.GetResult<Prisma.$ArchivedCallsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArchivedCalls.
     * @param {ArchivedCallsUpdateArgs} args - Arguments to update one ArchivedCalls.
     * @example
     * // Update one ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArchivedCallsUpdateArgs>(args: SelectSubset<T, ArchivedCallsUpdateArgs<ExtArgs>>): Prisma__ArchivedCallsClient<$Result.GetResult<Prisma.$ArchivedCallsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArchivedCalls.
     * @param {ArchivedCallsDeleteManyArgs} args - Arguments to filter ArchivedCalls to delete.
     * @example
     * // Delete a few ArchivedCalls
     * const { count } = await prisma.archivedCalls.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArchivedCallsDeleteManyArgs>(args?: SelectSubset<T, ArchivedCallsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArchivedCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchivedCallsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArchivedCallsUpdateManyArgs>(args: SelectSubset<T, ArchivedCallsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArchivedCalls.
     * @param {ArchivedCallsUpsertArgs} args - Arguments to update or create a ArchivedCalls.
     * @example
     * // Update or create a ArchivedCalls
     * const archivedCalls = await prisma.archivedCalls.upsert({
     *   create: {
     *     // ... data to create a ArchivedCalls
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArchivedCalls we want to update
     *   }
     * })
     */
    upsert<T extends ArchivedCallsUpsertArgs>(args: SelectSubset<T, ArchivedCallsUpsertArgs<ExtArgs>>): Prisma__ArchivedCallsClient<$Result.GetResult<Prisma.$ArchivedCallsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArchivedCalls that matches the filter.
     * @param {ArchivedCallsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const archivedCalls = await prisma.archivedCalls.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ArchivedCallsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ArchivedCalls.
     * @param {ArchivedCallsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const archivedCalls = await prisma.archivedCalls.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ArchivedCallsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ArchivedCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchivedCallsCountArgs} args - Arguments to filter ArchivedCalls to count.
     * @example
     * // Count the number of ArchivedCalls
     * const count = await prisma.archivedCalls.count({
     *   where: {
     *     // ... the filter for the ArchivedCalls we want to count
     *   }
     * })
    **/
    count<T extends ArchivedCallsCountArgs>(
      args?: Subset<T, ArchivedCallsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArchivedCallsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArchivedCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchivedCallsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArchivedCallsAggregateArgs>(args: Subset<T, ArchivedCallsAggregateArgs>): Prisma.PrismaPromise<GetArchivedCallsAggregateType<T>>

    /**
     * Group by ArchivedCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchivedCallsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArchivedCallsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArchivedCallsGroupByArgs['orderBy'] }
        : { orderBy?: ArchivedCallsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArchivedCallsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArchivedCallsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArchivedCalls model
   */
  readonly fields: ArchivedCallsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArchivedCalls.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArchivedCallsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArchivedCalls model
   */
  interface ArchivedCallsFieldRefs {
    readonly id: FieldRef<"ArchivedCalls", 'String'>
    readonly toNum: FieldRef<"ArchivedCalls", 'String'>
    readonly fromNum: FieldRef<"ArchivedCalls", 'String'>
    readonly randomCall: FieldRef<"ArchivedCalls", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ArchivedCalls findUnique
   */
  export type ArchivedCallsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
    /**
     * Filter, which ArchivedCalls to fetch.
     */
    where: ArchivedCallsWhereUniqueInput
  }

  /**
   * ArchivedCalls findUniqueOrThrow
   */
  export type ArchivedCallsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
    /**
     * Filter, which ArchivedCalls to fetch.
     */
    where: ArchivedCallsWhereUniqueInput
  }

  /**
   * ArchivedCalls findFirst
   */
  export type ArchivedCallsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
    /**
     * Filter, which ArchivedCalls to fetch.
     */
    where?: ArchivedCallsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArchivedCalls to fetch.
     */
    orderBy?: ArchivedCallsOrderByWithRelationInput | ArchivedCallsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArchivedCalls.
     */
    cursor?: ArchivedCallsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArchivedCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArchivedCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArchivedCalls.
     */
    distinct?: ArchivedCallsScalarFieldEnum | ArchivedCallsScalarFieldEnum[]
  }

  /**
   * ArchivedCalls findFirstOrThrow
   */
  export type ArchivedCallsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
    /**
     * Filter, which ArchivedCalls to fetch.
     */
    where?: ArchivedCallsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArchivedCalls to fetch.
     */
    orderBy?: ArchivedCallsOrderByWithRelationInput | ArchivedCallsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArchivedCalls.
     */
    cursor?: ArchivedCallsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArchivedCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArchivedCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArchivedCalls.
     */
    distinct?: ArchivedCallsScalarFieldEnum | ArchivedCallsScalarFieldEnum[]
  }

  /**
   * ArchivedCalls findMany
   */
  export type ArchivedCallsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
    /**
     * Filter, which ArchivedCalls to fetch.
     */
    where?: ArchivedCallsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArchivedCalls to fetch.
     */
    orderBy?: ArchivedCallsOrderByWithRelationInput | ArchivedCallsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArchivedCalls.
     */
    cursor?: ArchivedCallsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArchivedCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArchivedCalls.
     */
    skip?: number
    distinct?: ArchivedCallsScalarFieldEnum | ArchivedCallsScalarFieldEnum[]
  }

  /**
   * ArchivedCalls create
   */
  export type ArchivedCallsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
    /**
     * The data needed to create a ArchivedCalls.
     */
    data: XOR<ArchivedCallsCreateInput, ArchivedCallsUncheckedCreateInput>
  }

  /**
   * ArchivedCalls createMany
   */
  export type ArchivedCallsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArchivedCalls.
     */
    data: ArchivedCallsCreateManyInput | ArchivedCallsCreateManyInput[]
  }

  /**
   * ArchivedCalls update
   */
  export type ArchivedCallsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
    /**
     * The data needed to update a ArchivedCalls.
     */
    data: XOR<ArchivedCallsUpdateInput, ArchivedCallsUncheckedUpdateInput>
    /**
     * Choose, which ArchivedCalls to update.
     */
    where: ArchivedCallsWhereUniqueInput
  }

  /**
   * ArchivedCalls updateMany
   */
  export type ArchivedCallsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArchivedCalls.
     */
    data: XOR<ArchivedCallsUpdateManyMutationInput, ArchivedCallsUncheckedUpdateManyInput>
    /**
     * Filter which ArchivedCalls to update
     */
    where?: ArchivedCallsWhereInput
    /**
     * Limit how many ArchivedCalls to update.
     */
    limit?: number
  }

  /**
   * ArchivedCalls upsert
   */
  export type ArchivedCallsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
    /**
     * The filter to search for the ArchivedCalls to update in case it exists.
     */
    where: ArchivedCallsWhereUniqueInput
    /**
     * In case the ArchivedCalls found by the `where` argument doesn't exist, create a new ArchivedCalls with this data.
     */
    create: XOR<ArchivedCallsCreateInput, ArchivedCallsUncheckedCreateInput>
    /**
     * In case the ArchivedCalls was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArchivedCallsUpdateInput, ArchivedCallsUncheckedUpdateInput>
  }

  /**
   * ArchivedCalls delete
   */
  export type ArchivedCallsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
    /**
     * Filter which ArchivedCalls to delete.
     */
    where: ArchivedCallsWhereUniqueInput
  }

  /**
   * ArchivedCalls deleteMany
   */
  export type ArchivedCallsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArchivedCalls to delete
     */
    where?: ArchivedCallsWhereInput
    /**
     * Limit how many ArchivedCalls to delete.
     */
    limit?: number
  }

  /**
   * ArchivedCalls findRaw
   */
  export type ArchivedCallsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ArchivedCalls aggregateRaw
   */
  export type ArchivedCallsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ArchivedCalls without action
   */
  export type ArchivedCallsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchivedCalls
     */
    select?: ArchivedCallsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchivedCalls
     */
    omit?: ArchivedCallsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchivedCallsInclude<ExtArgs> | null
  }


  /**
   * Model GuildConfigs
   */

  export type AggregateGuildConfigs = {
    _count: GuildConfigsCountAggregateOutputType | null
    _min: GuildConfigsMinAggregateOutputType | null
    _max: GuildConfigsMaxAggregateOutputType | null
  }

  export type GuildConfigsMinAggregateOutputType = {
    id: string | null
    whitelisted: boolean | null
    locale: string | null
  }

  export type GuildConfigsMaxAggregateOutputType = {
    id: string | null
    whitelisted: boolean | null
    locale: string | null
  }

  export type GuildConfigsCountAggregateOutputType = {
    id: number
    whitelisted: number
    locale: number
    _all: number
  }


  export type GuildConfigsMinAggregateInputType = {
    id?: true
    whitelisted?: true
    locale?: true
  }

  export type GuildConfigsMaxAggregateInputType = {
    id?: true
    whitelisted?: true
    locale?: true
  }

  export type GuildConfigsCountAggregateInputType = {
    id?: true
    whitelisted?: true
    locale?: true
    _all?: true
  }

  export type GuildConfigsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildConfigs to aggregate.
     */
    where?: GuildConfigsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigsOrderByWithRelationInput | GuildConfigsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuildConfigsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuildConfigs
    **/
    _count?: true | GuildConfigsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildConfigsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildConfigsMaxAggregateInputType
  }

  export type GetGuildConfigsAggregateType<T extends GuildConfigsAggregateArgs> = {
        [P in keyof T & keyof AggregateGuildConfigs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuildConfigs[P]>
      : GetScalarType<T[P], AggregateGuildConfigs[P]>
  }




  export type GuildConfigsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildConfigsWhereInput
    orderBy?: GuildConfigsOrderByWithAggregationInput | GuildConfigsOrderByWithAggregationInput[]
    by: GuildConfigsScalarFieldEnum[] | GuildConfigsScalarFieldEnum
    having?: GuildConfigsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildConfigsCountAggregateInputType | true
    _min?: GuildConfigsMinAggregateInputType
    _max?: GuildConfigsMaxAggregateInputType
  }

  export type GuildConfigsGroupByOutputType = {
    id: string
    whitelisted: boolean
    locale: string
    _count: GuildConfigsCountAggregateOutputType | null
    _min: GuildConfigsMinAggregateOutputType | null
    _max: GuildConfigsMaxAggregateOutputType | null
  }

  type GetGuildConfigsGroupByPayload<T extends GuildConfigsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildConfigsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildConfigsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildConfigsGroupByOutputType[P]>
            : GetScalarType<T[P], GuildConfigsGroupByOutputType[P]>
        }
      >
    >


  export type GuildConfigsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    whitelisted?: boolean
    locale?: boolean
    numbers?: boolean | GuildConfigs$numbersArgs<ExtArgs>
    strikes?: boolean | GuildConfigs$strikesArgs<ExtArgs>
    _count?: boolean | GuildConfigsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guildConfigs"]>



  export type GuildConfigsSelectScalar = {
    id?: boolean
    whitelisted?: boolean
    locale?: boolean
  }

  export type GuildConfigsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "whitelisted" | "locale", ExtArgs["result"]["guildConfigs"]>
  export type GuildConfigsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    numbers?: boolean | GuildConfigs$numbersArgs<ExtArgs>
    strikes?: boolean | GuildConfigs$strikesArgs<ExtArgs>
    _count?: boolean | GuildConfigsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $GuildConfigsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuildConfigs"
    objects: {
      numbers: Prisma.$NumbersPayload<ExtArgs>[]
      strikes: Prisma.$StrikesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      whitelisted: boolean
      locale: string
    }, ExtArgs["result"]["guildConfigs"]>
    composites: {}
  }

  type GuildConfigsGetPayload<S extends boolean | null | undefined | GuildConfigsDefaultArgs> = $Result.GetResult<Prisma.$GuildConfigsPayload, S>

  type GuildConfigsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuildConfigsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuildConfigsCountAggregateInputType | true
    }

  export interface GuildConfigsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuildConfigs'], meta: { name: 'GuildConfigs' } }
    /**
     * Find zero or one GuildConfigs that matches the filter.
     * @param {GuildConfigsFindUniqueArgs} args - Arguments to find a GuildConfigs
     * @example
     * // Get one GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuildConfigsFindUniqueArgs>(args: SelectSubset<T, GuildConfigsFindUniqueArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GuildConfigs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuildConfigsFindUniqueOrThrowArgs} args - Arguments to find a GuildConfigs
     * @example
     * // Get one GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuildConfigsFindUniqueOrThrowArgs>(args: SelectSubset<T, GuildConfigsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuildConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigsFindFirstArgs} args - Arguments to find a GuildConfigs
     * @example
     * // Get one GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuildConfigsFindFirstArgs>(args?: SelectSubset<T, GuildConfigsFindFirstArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuildConfigs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigsFindFirstOrThrowArgs} args - Arguments to find a GuildConfigs
     * @example
     * // Get one GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuildConfigsFindFirstOrThrowArgs>(args?: SelectSubset<T, GuildConfigsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GuildConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.findMany()
     * 
     * // Get first 10 GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guildConfigsWithIdOnly = await prisma.guildConfigs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuildConfigsFindManyArgs>(args?: SelectSubset<T, GuildConfigsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GuildConfigs.
     * @param {GuildConfigsCreateArgs} args - Arguments to create a GuildConfigs.
     * @example
     * // Create one GuildConfigs
     * const GuildConfigs = await prisma.guildConfigs.create({
     *   data: {
     *     // ... data to create a GuildConfigs
     *   }
     * })
     * 
     */
    create<T extends GuildConfigsCreateArgs>(args: SelectSubset<T, GuildConfigsCreateArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GuildConfigs.
     * @param {GuildConfigsCreateManyArgs} args - Arguments to create many GuildConfigs.
     * @example
     * // Create many GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuildConfigsCreateManyArgs>(args?: SelectSubset<T, GuildConfigsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GuildConfigs.
     * @param {GuildConfigsDeleteArgs} args - Arguments to delete one GuildConfigs.
     * @example
     * // Delete one GuildConfigs
     * const GuildConfigs = await prisma.guildConfigs.delete({
     *   where: {
     *     // ... filter to delete one GuildConfigs
     *   }
     * })
     * 
     */
    delete<T extends GuildConfigsDeleteArgs>(args: SelectSubset<T, GuildConfigsDeleteArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GuildConfigs.
     * @param {GuildConfigsUpdateArgs} args - Arguments to update one GuildConfigs.
     * @example
     * // Update one GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuildConfigsUpdateArgs>(args: SelectSubset<T, GuildConfigsUpdateArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GuildConfigs.
     * @param {GuildConfigsDeleteManyArgs} args - Arguments to filter GuildConfigs to delete.
     * @example
     * // Delete a few GuildConfigs
     * const { count } = await prisma.guildConfigs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuildConfigsDeleteManyArgs>(args?: SelectSubset<T, GuildConfigsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuildConfigsUpdateManyArgs>(args: SelectSubset<T, GuildConfigsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GuildConfigs.
     * @param {GuildConfigsUpsertArgs} args - Arguments to update or create a GuildConfigs.
     * @example
     * // Update or create a GuildConfigs
     * const guildConfigs = await prisma.guildConfigs.upsert({
     *   create: {
     *     // ... data to create a GuildConfigs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuildConfigs we want to update
     *   }
     * })
     */
    upsert<T extends GuildConfigsUpsertArgs>(args: SelectSubset<T, GuildConfigsUpsertArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GuildConfigs that matches the filter.
     * @param {GuildConfigsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const guildConfigs = await prisma.guildConfigs.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: GuildConfigsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a GuildConfigs.
     * @param {GuildConfigsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const guildConfigs = await prisma.guildConfigs.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: GuildConfigsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of GuildConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigsCountArgs} args - Arguments to filter GuildConfigs to count.
     * @example
     * // Count the number of GuildConfigs
     * const count = await prisma.guildConfigs.count({
     *   where: {
     *     // ... the filter for the GuildConfigs we want to count
     *   }
     * })
    **/
    count<T extends GuildConfigsCountArgs>(
      args?: Subset<T, GuildConfigsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildConfigsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuildConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuildConfigsAggregateArgs>(args: Subset<T, GuildConfigsAggregateArgs>): Prisma.PrismaPromise<GetGuildConfigsAggregateType<T>>

    /**
     * Group by GuildConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuildConfigsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuildConfigsGroupByArgs['orderBy'] }
        : { orderBy?: GuildConfigsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuildConfigsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildConfigsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuildConfigs model
   */
  readonly fields: GuildConfigsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuildConfigs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuildConfigsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    numbers<T extends GuildConfigs$numbersArgs<ExtArgs> = {}>(args?: Subset<T, GuildConfigs$numbersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    strikes<T extends GuildConfigs$strikesArgs<ExtArgs> = {}>(args?: Subset<T, GuildConfigs$strikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuildConfigs model
   */
  interface GuildConfigsFieldRefs {
    readonly id: FieldRef<"GuildConfigs", 'String'>
    readonly whitelisted: FieldRef<"GuildConfigs", 'Boolean'>
    readonly locale: FieldRef<"GuildConfigs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GuildConfigs findUnique
   */
  export type GuildConfigsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfigs to fetch.
     */
    where: GuildConfigsWhereUniqueInput
  }

  /**
   * GuildConfigs findUniqueOrThrow
   */
  export type GuildConfigsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfigs to fetch.
     */
    where: GuildConfigsWhereUniqueInput
  }

  /**
   * GuildConfigs findFirst
   */
  export type GuildConfigsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfigs to fetch.
     */
    where?: GuildConfigsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigsOrderByWithRelationInput | GuildConfigsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildConfigs.
     */
    cursor?: GuildConfigsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildConfigs.
     */
    distinct?: GuildConfigsScalarFieldEnum | GuildConfigsScalarFieldEnum[]
  }

  /**
   * GuildConfigs findFirstOrThrow
   */
  export type GuildConfigsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfigs to fetch.
     */
    where?: GuildConfigsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigsOrderByWithRelationInput | GuildConfigsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildConfigs.
     */
    cursor?: GuildConfigsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildConfigs.
     */
    distinct?: GuildConfigsScalarFieldEnum | GuildConfigsScalarFieldEnum[]
  }

  /**
   * GuildConfigs findMany
   */
  export type GuildConfigsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfigs to fetch.
     */
    where?: GuildConfigsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigsOrderByWithRelationInput | GuildConfigsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuildConfigs.
     */
    cursor?: GuildConfigsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    distinct?: GuildConfigsScalarFieldEnum | GuildConfigsScalarFieldEnum[]
  }

  /**
   * GuildConfigs create
   */
  export type GuildConfigsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    /**
     * The data needed to create a GuildConfigs.
     */
    data: XOR<GuildConfigsCreateInput, GuildConfigsUncheckedCreateInput>
  }

  /**
   * GuildConfigs createMany
   */
  export type GuildConfigsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuildConfigs.
     */
    data: GuildConfigsCreateManyInput | GuildConfigsCreateManyInput[]
  }

  /**
   * GuildConfigs update
   */
  export type GuildConfigsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    /**
     * The data needed to update a GuildConfigs.
     */
    data: XOR<GuildConfigsUpdateInput, GuildConfigsUncheckedUpdateInput>
    /**
     * Choose, which GuildConfigs to update.
     */
    where: GuildConfigsWhereUniqueInput
  }

  /**
   * GuildConfigs updateMany
   */
  export type GuildConfigsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuildConfigs.
     */
    data: XOR<GuildConfigsUpdateManyMutationInput, GuildConfigsUncheckedUpdateManyInput>
    /**
     * Filter which GuildConfigs to update
     */
    where?: GuildConfigsWhereInput
    /**
     * Limit how many GuildConfigs to update.
     */
    limit?: number
  }

  /**
   * GuildConfigs upsert
   */
  export type GuildConfigsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    /**
     * The filter to search for the GuildConfigs to update in case it exists.
     */
    where: GuildConfigsWhereUniqueInput
    /**
     * In case the GuildConfigs found by the `where` argument doesn't exist, create a new GuildConfigs with this data.
     */
    create: XOR<GuildConfigsCreateInput, GuildConfigsUncheckedCreateInput>
    /**
     * In case the GuildConfigs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuildConfigsUpdateInput, GuildConfigsUncheckedUpdateInput>
  }

  /**
   * GuildConfigs delete
   */
  export type GuildConfigsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
    /**
     * Filter which GuildConfigs to delete.
     */
    where: GuildConfigsWhereUniqueInput
  }

  /**
   * GuildConfigs deleteMany
   */
  export type GuildConfigsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildConfigs to delete
     */
    where?: GuildConfigsWhereInput
    /**
     * Limit how many GuildConfigs to delete.
     */
    limit?: number
  }

  /**
   * GuildConfigs findRaw
   */
  export type GuildConfigsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * GuildConfigs aggregateRaw
   */
  export type GuildConfigsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * GuildConfigs.numbers
   */
  export type GuildConfigs$numbersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Numbers
     */
    select?: NumbersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Numbers
     */
    omit?: NumbersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NumbersInclude<ExtArgs> | null
    where?: NumbersWhereInput
    orderBy?: NumbersOrderByWithRelationInput | NumbersOrderByWithRelationInput[]
    cursor?: NumbersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NumbersScalarFieldEnum | NumbersScalarFieldEnum[]
  }

  /**
   * GuildConfigs.strikes
   */
  export type GuildConfigs$strikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    where?: StrikesWhereInput
    orderBy?: StrikesOrderByWithRelationInput | StrikesOrderByWithRelationInput[]
    cursor?: StrikesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StrikesScalarFieldEnum | StrikesScalarFieldEnum[]
  }

  /**
   * GuildConfigs without action
   */
  export type GuildConfigsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigs
     */
    select?: GuildConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfigs
     */
    omit?: GuildConfigsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigsInclude<ExtArgs> | null
  }


  /**
   * Model Accounts
   */

  export type AggregateAccounts = {
    _count: AccountsCountAggregateOutputType | null
    _avg: AccountsAvgAggregateOutputType | null
    _sum: AccountsSumAggregateOutputType | null
    _min: AccountsMinAggregateOutputType | null
    _max: AccountsMaxAggregateOutputType | null
  }

  export type AccountsAvgAggregateOutputType = {
    balance: number | null
    vipMonthsRemaining: number | null
  }

  export type AccountsSumAggregateOutputType = {
    balance: number | null
    vipMonthsRemaining: number | null
  }

  export type AccountsMinAggregateOutputType = {
    id: string | null
    balance: number | null
    dailyClaimedAt: Date | null
    vipMonthsRemaining: number | null
  }

  export type AccountsMaxAggregateOutputType = {
    id: string | null
    balance: number | null
    dailyClaimedAt: Date | null
    vipMonthsRemaining: number | null
  }

  export type AccountsCountAggregateOutputType = {
    id: number
    balance: number
    dailyClaimedAt: number
    vipMonthsRemaining: number
    _all: number
  }


  export type AccountsAvgAggregateInputType = {
    balance?: true
    vipMonthsRemaining?: true
  }

  export type AccountsSumAggregateInputType = {
    balance?: true
    vipMonthsRemaining?: true
  }

  export type AccountsMinAggregateInputType = {
    id?: true
    balance?: true
    dailyClaimedAt?: true
    vipMonthsRemaining?: true
  }

  export type AccountsMaxAggregateInputType = {
    id?: true
    balance?: true
    dailyClaimedAt?: true
    vipMonthsRemaining?: true
  }

  export type AccountsCountAggregateInputType = {
    id?: true
    balance?: true
    dailyClaimedAt?: true
    vipMonthsRemaining?: true
    _all?: true
  }

  export type AccountsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to aggregate.
     */
    where?: AccountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountsOrderByWithRelationInput | AccountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountsMaxAggregateInputType
  }

  export type GetAccountsAggregateType<T extends AccountsAggregateArgs> = {
        [P in keyof T & keyof AggregateAccounts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccounts[P]>
      : GetScalarType<T[P], AggregateAccounts[P]>
  }




  export type AccountsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountsWhereInput
    orderBy?: AccountsOrderByWithAggregationInput | AccountsOrderByWithAggregationInput[]
    by: AccountsScalarFieldEnum[] | AccountsScalarFieldEnum
    having?: AccountsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountsCountAggregateInputType | true
    _avg?: AccountsAvgAggregateInputType
    _sum?: AccountsSumAggregateInputType
    _min?: AccountsMinAggregateInputType
    _max?: AccountsMaxAggregateInputType
  }

  export type AccountsGroupByOutputType = {
    id: string
    balance: number
    dailyClaimedAt: Date | null
    vipMonthsRemaining: number
    _count: AccountsCountAggregateOutputType | null
    _avg: AccountsAvgAggregateOutputType | null
    _sum: AccountsSumAggregateOutputType | null
    _min: AccountsMinAggregateOutputType | null
    _max: AccountsMaxAggregateOutputType | null
  }

  type GetAccountsGroupByPayload<T extends AccountsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountsGroupByOutputType[P]>
            : GetScalarType<T[P], AccountsGroupByOutputType[P]>
        }
      >
    >


  export type AccountsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    balance?: boolean
    dailyClaimedAt?: boolean
    vipMonthsRemaining?: boolean
    strikes?: boolean | Accounts$strikesArgs<ExtArgs>
    Votes?: boolean | Accounts$VotesArgs<ExtArgs>
    _count?: boolean | AccountsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accounts"]>



  export type AccountsSelectScalar = {
    id?: boolean
    balance?: boolean
    dailyClaimedAt?: boolean
    vipMonthsRemaining?: boolean
  }

  export type AccountsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "balance" | "dailyClaimedAt" | "vipMonthsRemaining", ExtArgs["result"]["accounts"]>
  export type AccountsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strikes?: boolean | Accounts$strikesArgs<ExtArgs>
    Votes?: boolean | Accounts$VotesArgs<ExtArgs>
    _count?: boolean | AccountsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AccountsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Accounts"
    objects: {
      strikes: Prisma.$StrikesPayload<ExtArgs>[]
      Votes: Prisma.$VotesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      balance: number
      dailyClaimedAt: Date | null
      vipMonthsRemaining: number
    }, ExtArgs["result"]["accounts"]>
    composites: {}
  }

  type AccountsGetPayload<S extends boolean | null | undefined | AccountsDefaultArgs> = $Result.GetResult<Prisma.$AccountsPayload, S>

  type AccountsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountsCountAggregateInputType | true
    }

  export interface AccountsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Accounts'], meta: { name: 'Accounts' } }
    /**
     * Find zero or one Accounts that matches the filter.
     * @param {AccountsFindUniqueArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountsFindUniqueArgs>(args: SelectSubset<T, AccountsFindUniqueArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Accounts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountsFindUniqueOrThrowArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountsFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsFindFirstArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountsFindFirstArgs>(args?: SelectSubset<T, AccountsFindFirstArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Accounts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsFindFirstOrThrowArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountsFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.accounts.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.accounts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountsWithIdOnly = await prisma.accounts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountsFindManyArgs>(args?: SelectSubset<T, AccountsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Accounts.
     * @param {AccountsCreateArgs} args - Arguments to create a Accounts.
     * @example
     * // Create one Accounts
     * const Accounts = await prisma.accounts.create({
     *   data: {
     *     // ... data to create a Accounts
     *   }
     * })
     * 
     */
    create<T extends AccountsCreateArgs>(args: SelectSubset<T, AccountsCreateArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountsCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const accounts = await prisma.accounts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountsCreateManyArgs>(args?: SelectSubset<T, AccountsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Accounts.
     * @param {AccountsDeleteArgs} args - Arguments to delete one Accounts.
     * @example
     * // Delete one Accounts
     * const Accounts = await prisma.accounts.delete({
     *   where: {
     *     // ... filter to delete one Accounts
     *   }
     * })
     * 
     */
    delete<T extends AccountsDeleteArgs>(args: SelectSubset<T, AccountsDeleteArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Accounts.
     * @param {AccountsUpdateArgs} args - Arguments to update one Accounts.
     * @example
     * // Update one Accounts
     * const accounts = await prisma.accounts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountsUpdateArgs>(args: SelectSubset<T, AccountsUpdateArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountsDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.accounts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountsDeleteManyArgs>(args?: SelectSubset<T, AccountsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const accounts = await prisma.accounts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountsUpdateManyArgs>(args: SelectSubset<T, AccountsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Accounts.
     * @param {AccountsUpsertArgs} args - Arguments to update or create a Accounts.
     * @example
     * // Update or create a Accounts
     * const accounts = await prisma.accounts.upsert({
     *   create: {
     *     // ... data to create a Accounts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Accounts we want to update
     *   }
     * })
     */
    upsert<T extends AccountsUpsertArgs>(args: SelectSubset<T, AccountsUpsertArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * @param {AccountsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const accounts = await prisma.accounts.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AccountsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Accounts.
     * @param {AccountsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const accounts = await prisma.accounts.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AccountsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.accounts.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountsCountArgs>(
      args?: Subset<T, AccountsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountsAggregateArgs>(args: Subset<T, AccountsAggregateArgs>): Prisma.PrismaPromise<GetAccountsAggregateType<T>>

    /**
     * Group by Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountsGroupByArgs['orderBy'] }
        : { orderBy?: AccountsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Accounts model
   */
  readonly fields: AccountsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Accounts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    strikes<T extends Accounts$strikesArgs<ExtArgs> = {}>(args?: Subset<T, Accounts$strikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Votes<T extends Accounts$VotesArgs<ExtArgs> = {}>(args?: Subset<T, Accounts$VotesArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Accounts model
   */
  interface AccountsFieldRefs {
    readonly id: FieldRef<"Accounts", 'String'>
    readonly balance: FieldRef<"Accounts", 'Float'>
    readonly dailyClaimedAt: FieldRef<"Accounts", 'DateTime'>
    readonly vipMonthsRemaining: FieldRef<"Accounts", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Accounts findUnique
   */
  export type AccountsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where: AccountsWhereUniqueInput
  }

  /**
   * Accounts findUniqueOrThrow
   */
  export type AccountsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where: AccountsWhereUniqueInput
  }

  /**
   * Accounts findFirst
   */
  export type AccountsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountsOrderByWithRelationInput | AccountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountsScalarFieldEnum | AccountsScalarFieldEnum[]
  }

  /**
   * Accounts findFirstOrThrow
   */
  export type AccountsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountsOrderByWithRelationInput | AccountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountsScalarFieldEnum | AccountsScalarFieldEnum[]
  }

  /**
   * Accounts findMany
   */
  export type AccountsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountsOrderByWithRelationInput | AccountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountsScalarFieldEnum | AccountsScalarFieldEnum[]
  }

  /**
   * Accounts create
   */
  export type AccountsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
    /**
     * The data needed to create a Accounts.
     */
    data: XOR<AccountsCreateInput, AccountsUncheckedCreateInput>
  }

  /**
   * Accounts createMany
   */
  export type AccountsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountsCreateManyInput | AccountsCreateManyInput[]
  }

  /**
   * Accounts update
   */
  export type AccountsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
    /**
     * The data needed to update a Accounts.
     */
    data: XOR<AccountsUpdateInput, AccountsUncheckedUpdateInput>
    /**
     * Choose, which Accounts to update.
     */
    where: AccountsWhereUniqueInput
  }

  /**
   * Accounts updateMany
   */
  export type AccountsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountsUpdateManyMutationInput, AccountsUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountsWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Accounts upsert
   */
  export type AccountsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
    /**
     * The filter to search for the Accounts to update in case it exists.
     */
    where: AccountsWhereUniqueInput
    /**
     * In case the Accounts found by the `where` argument doesn't exist, create a new Accounts with this data.
     */
    create: XOR<AccountsCreateInput, AccountsUncheckedCreateInput>
    /**
     * In case the Accounts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountsUpdateInput, AccountsUncheckedUpdateInput>
  }

  /**
   * Accounts delete
   */
  export type AccountsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
    /**
     * Filter which Accounts to delete.
     */
    where: AccountsWhereUniqueInput
  }

  /**
   * Accounts deleteMany
   */
  export type AccountsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountsWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Accounts findRaw
   */
  export type AccountsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Accounts aggregateRaw
   */
  export type AccountsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Accounts.strikes
   */
  export type Accounts$strikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    where?: StrikesWhereInput
    orderBy?: StrikesOrderByWithRelationInput | StrikesOrderByWithRelationInput[]
    cursor?: StrikesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StrikesScalarFieldEnum | StrikesScalarFieldEnum[]
  }

  /**
   * Accounts.Votes
   */
  export type Accounts$VotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    where?: VotesWhereInput
  }

  /**
   * Accounts without action
   */
  export type AccountsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Accounts
     */
    select?: AccountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Accounts
     */
    omit?: AccountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountsInclude<ExtArgs> | null
  }


  /**
   * Model Strikes
   */

  export type AggregateStrikes = {
    _count: StrikesCountAggregateOutputType | null
    _min: StrikesMinAggregateOutputType | null
    _max: StrikesMaxAggregateOutputType | null
  }

  export type StrikesMinAggregateOutputType = {
    id: string | null
    offender: string | null
    reason: string | null
    type: $Enums.StrikeOffenderType | null
  }

  export type StrikesMaxAggregateOutputType = {
    id: string | null
    offender: string | null
    reason: string | null
    type: $Enums.StrikeOffenderType | null
  }

  export type StrikesCountAggregateOutputType = {
    id: number
    offender: number
    reason: number
    type: number
    _all: number
  }


  export type StrikesMinAggregateInputType = {
    id?: true
    offender?: true
    reason?: true
    type?: true
  }

  export type StrikesMaxAggregateInputType = {
    id?: true
    offender?: true
    reason?: true
    type?: true
  }

  export type StrikesCountAggregateInputType = {
    id?: true
    offender?: true
    reason?: true
    type?: true
    _all?: true
  }

  export type StrikesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Strikes to aggregate.
     */
    where?: StrikesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strikes to fetch.
     */
    orderBy?: StrikesOrderByWithRelationInput | StrikesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StrikesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Strikes
    **/
    _count?: true | StrikesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StrikesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StrikesMaxAggregateInputType
  }

  export type GetStrikesAggregateType<T extends StrikesAggregateArgs> = {
        [P in keyof T & keyof AggregateStrikes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStrikes[P]>
      : GetScalarType<T[P], AggregateStrikes[P]>
  }




  export type StrikesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrikesWhereInput
    orderBy?: StrikesOrderByWithAggregationInput | StrikesOrderByWithAggregationInput[]
    by: StrikesScalarFieldEnum[] | StrikesScalarFieldEnum
    having?: StrikesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StrikesCountAggregateInputType | true
    _min?: StrikesMinAggregateInputType
    _max?: StrikesMaxAggregateInputType
  }

  export type StrikesGroupByOutputType = {
    id: string
    offender: string
    reason: string
    type: $Enums.StrikeOffenderType
    _count: StrikesCountAggregateOutputType | null
    _min: StrikesMinAggregateOutputType | null
    _max: StrikesMaxAggregateOutputType | null
  }

  type GetStrikesGroupByPayload<T extends StrikesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StrikesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StrikesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StrikesGroupByOutputType[P]>
            : GetScalarType<T[P], StrikesGroupByOutputType[P]>
        }
      >
    >


  export type StrikesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    offender?: boolean
    reason?: boolean
    type?: boolean
    created?: boolean | atAndByDefaultArgs<ExtArgs>
    account?: boolean | AccountsDefaultArgs<ExtArgs>
    guildConfig?: boolean | GuildConfigsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["strikes"]>



  export type StrikesSelectScalar = {
    id?: boolean
    offender?: boolean
    reason?: boolean
    type?: boolean
  }

  export type StrikesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "offender" | "reason" | "type" | "created", ExtArgs["result"]["strikes"]>
  export type StrikesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountsDefaultArgs<ExtArgs>
    guildConfig?: boolean | GuildConfigsDefaultArgs<ExtArgs>
  }

  export type $StrikesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Strikes"
    objects: {
      account: Prisma.$AccountsPayload<ExtArgs>
      guildConfig: Prisma.$GuildConfigsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      offender: string
      reason: string
      type: $Enums.StrikeOffenderType
    }, ExtArgs["result"]["strikes"]>
    composites: {
      created: Prisma.$atAndByPayload
    }
  }

  type StrikesGetPayload<S extends boolean | null | undefined | StrikesDefaultArgs> = $Result.GetResult<Prisma.$StrikesPayload, S>

  type StrikesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StrikesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StrikesCountAggregateInputType | true
    }

  export interface StrikesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Strikes'], meta: { name: 'Strikes' } }
    /**
     * Find zero or one Strikes that matches the filter.
     * @param {StrikesFindUniqueArgs} args - Arguments to find a Strikes
     * @example
     * // Get one Strikes
     * const strikes = await prisma.strikes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StrikesFindUniqueArgs>(args: SelectSubset<T, StrikesFindUniqueArgs<ExtArgs>>): Prisma__StrikesClient<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Strikes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StrikesFindUniqueOrThrowArgs} args - Arguments to find a Strikes
     * @example
     * // Get one Strikes
     * const strikes = await prisma.strikes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StrikesFindUniqueOrThrowArgs>(args: SelectSubset<T, StrikesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StrikesClient<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Strikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrikesFindFirstArgs} args - Arguments to find a Strikes
     * @example
     * // Get one Strikes
     * const strikes = await prisma.strikes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StrikesFindFirstArgs>(args?: SelectSubset<T, StrikesFindFirstArgs<ExtArgs>>): Prisma__StrikesClient<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Strikes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrikesFindFirstOrThrowArgs} args - Arguments to find a Strikes
     * @example
     * // Get one Strikes
     * const strikes = await prisma.strikes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StrikesFindFirstOrThrowArgs>(args?: SelectSubset<T, StrikesFindFirstOrThrowArgs<ExtArgs>>): Prisma__StrikesClient<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Strikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrikesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Strikes
     * const strikes = await prisma.strikes.findMany()
     * 
     * // Get first 10 Strikes
     * const strikes = await prisma.strikes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const strikesWithIdOnly = await prisma.strikes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StrikesFindManyArgs>(args?: SelectSubset<T, StrikesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Strikes.
     * @param {StrikesCreateArgs} args - Arguments to create a Strikes.
     * @example
     * // Create one Strikes
     * const Strikes = await prisma.strikes.create({
     *   data: {
     *     // ... data to create a Strikes
     *   }
     * })
     * 
     */
    create<T extends StrikesCreateArgs>(args: SelectSubset<T, StrikesCreateArgs<ExtArgs>>): Prisma__StrikesClient<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Strikes.
     * @param {StrikesCreateManyArgs} args - Arguments to create many Strikes.
     * @example
     * // Create many Strikes
     * const strikes = await prisma.strikes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StrikesCreateManyArgs>(args?: SelectSubset<T, StrikesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Strikes.
     * @param {StrikesDeleteArgs} args - Arguments to delete one Strikes.
     * @example
     * // Delete one Strikes
     * const Strikes = await prisma.strikes.delete({
     *   where: {
     *     // ... filter to delete one Strikes
     *   }
     * })
     * 
     */
    delete<T extends StrikesDeleteArgs>(args: SelectSubset<T, StrikesDeleteArgs<ExtArgs>>): Prisma__StrikesClient<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Strikes.
     * @param {StrikesUpdateArgs} args - Arguments to update one Strikes.
     * @example
     * // Update one Strikes
     * const strikes = await prisma.strikes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StrikesUpdateArgs>(args: SelectSubset<T, StrikesUpdateArgs<ExtArgs>>): Prisma__StrikesClient<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Strikes.
     * @param {StrikesDeleteManyArgs} args - Arguments to filter Strikes to delete.
     * @example
     * // Delete a few Strikes
     * const { count } = await prisma.strikes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StrikesDeleteManyArgs>(args?: SelectSubset<T, StrikesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Strikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrikesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Strikes
     * const strikes = await prisma.strikes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StrikesUpdateManyArgs>(args: SelectSubset<T, StrikesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Strikes.
     * @param {StrikesUpsertArgs} args - Arguments to update or create a Strikes.
     * @example
     * // Update or create a Strikes
     * const strikes = await prisma.strikes.upsert({
     *   create: {
     *     // ... data to create a Strikes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Strikes we want to update
     *   }
     * })
     */
    upsert<T extends StrikesUpsertArgs>(args: SelectSubset<T, StrikesUpsertArgs<ExtArgs>>): Prisma__StrikesClient<$Result.GetResult<Prisma.$StrikesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Strikes that matches the filter.
     * @param {StrikesFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const strikes = await prisma.strikes.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: StrikesFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Strikes.
     * @param {StrikesAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const strikes = await prisma.strikes.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: StrikesAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Strikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrikesCountArgs} args - Arguments to filter Strikes to count.
     * @example
     * // Count the number of Strikes
     * const count = await prisma.strikes.count({
     *   where: {
     *     // ... the filter for the Strikes we want to count
     *   }
     * })
    **/
    count<T extends StrikesCountArgs>(
      args?: Subset<T, StrikesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StrikesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Strikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrikesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StrikesAggregateArgs>(args: Subset<T, StrikesAggregateArgs>): Prisma.PrismaPromise<GetStrikesAggregateType<T>>

    /**
     * Group by Strikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrikesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StrikesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StrikesGroupByArgs['orderBy'] }
        : { orderBy?: StrikesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StrikesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStrikesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Strikes model
   */
  readonly fields: StrikesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Strikes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StrikesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends AccountsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountsDefaultArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    guildConfig<T extends GuildConfigsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GuildConfigsDefaultArgs<ExtArgs>>): Prisma__GuildConfigsClient<$Result.GetResult<Prisma.$GuildConfigsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Strikes model
   */
  interface StrikesFieldRefs {
    readonly id: FieldRef<"Strikes", 'String'>
    readonly offender: FieldRef<"Strikes", 'String'>
    readonly reason: FieldRef<"Strikes", 'String'>
    readonly type: FieldRef<"Strikes", 'StrikeOffenderType'>
  }
    

  // Custom InputTypes
  /**
   * Strikes findUnique
   */
  export type StrikesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    /**
     * Filter, which Strikes to fetch.
     */
    where: StrikesWhereUniqueInput
  }

  /**
   * Strikes findUniqueOrThrow
   */
  export type StrikesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    /**
     * Filter, which Strikes to fetch.
     */
    where: StrikesWhereUniqueInput
  }

  /**
   * Strikes findFirst
   */
  export type StrikesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    /**
     * Filter, which Strikes to fetch.
     */
    where?: StrikesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strikes to fetch.
     */
    orderBy?: StrikesOrderByWithRelationInput | StrikesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Strikes.
     */
    cursor?: StrikesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Strikes.
     */
    distinct?: StrikesScalarFieldEnum | StrikesScalarFieldEnum[]
  }

  /**
   * Strikes findFirstOrThrow
   */
  export type StrikesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    /**
     * Filter, which Strikes to fetch.
     */
    where?: StrikesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strikes to fetch.
     */
    orderBy?: StrikesOrderByWithRelationInput | StrikesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Strikes.
     */
    cursor?: StrikesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Strikes.
     */
    distinct?: StrikesScalarFieldEnum | StrikesScalarFieldEnum[]
  }

  /**
   * Strikes findMany
   */
  export type StrikesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    /**
     * Filter, which Strikes to fetch.
     */
    where?: StrikesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strikes to fetch.
     */
    orderBy?: StrikesOrderByWithRelationInput | StrikesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Strikes.
     */
    cursor?: StrikesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strikes.
     */
    skip?: number
    distinct?: StrikesScalarFieldEnum | StrikesScalarFieldEnum[]
  }

  /**
   * Strikes create
   */
  export type StrikesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    /**
     * The data needed to create a Strikes.
     */
    data: XOR<StrikesCreateInput, StrikesUncheckedCreateInput>
  }

  /**
   * Strikes createMany
   */
  export type StrikesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Strikes.
     */
    data: StrikesCreateManyInput | StrikesCreateManyInput[]
  }

  /**
   * Strikes update
   */
  export type StrikesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    /**
     * The data needed to update a Strikes.
     */
    data: XOR<StrikesUpdateInput, StrikesUncheckedUpdateInput>
    /**
     * Choose, which Strikes to update.
     */
    where: StrikesWhereUniqueInput
  }

  /**
   * Strikes updateMany
   */
  export type StrikesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Strikes.
     */
    data: XOR<StrikesUpdateManyMutationInput, StrikesUncheckedUpdateManyInput>
    /**
     * Filter which Strikes to update
     */
    where?: StrikesWhereInput
    /**
     * Limit how many Strikes to update.
     */
    limit?: number
  }

  /**
   * Strikes upsert
   */
  export type StrikesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    /**
     * The filter to search for the Strikes to update in case it exists.
     */
    where: StrikesWhereUniqueInput
    /**
     * In case the Strikes found by the `where` argument doesn't exist, create a new Strikes with this data.
     */
    create: XOR<StrikesCreateInput, StrikesUncheckedCreateInput>
    /**
     * In case the Strikes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StrikesUpdateInput, StrikesUncheckedUpdateInput>
  }

  /**
   * Strikes delete
   */
  export type StrikesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
    /**
     * Filter which Strikes to delete.
     */
    where: StrikesWhereUniqueInput
  }

  /**
   * Strikes deleteMany
   */
  export type StrikesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Strikes to delete
     */
    where?: StrikesWhereInput
    /**
     * Limit how many Strikes to delete.
     */
    limit?: number
  }

  /**
   * Strikes findRaw
   */
  export type StrikesFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Strikes aggregateRaw
   */
  export type StrikesAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Strikes without action
   */
  export type StrikesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strikes
     */
    select?: StrikesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strikes
     */
    omit?: StrikesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrikesInclude<ExtArgs> | null
  }


  /**
   * Model Blacklist
   */

  export type AggregateBlacklist = {
    _count: BlacklistCountAggregateOutputType | null
    _min: BlacklistMinAggregateOutputType | null
    _max: BlacklistMaxAggregateOutputType | null
  }

  export type BlacklistMinAggregateOutputType = {
    id: string | null
    reason: string | null
  }

  export type BlacklistMaxAggregateOutputType = {
    id: string | null
    reason: string | null
  }

  export type BlacklistCountAggregateOutputType = {
    id: number
    reason: number
    _all: number
  }


  export type BlacklistMinAggregateInputType = {
    id?: true
    reason?: true
  }

  export type BlacklistMaxAggregateInputType = {
    id?: true
    reason?: true
  }

  export type BlacklistCountAggregateInputType = {
    id?: true
    reason?: true
    _all?: true
  }

  export type BlacklistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blacklist to aggregate.
     */
    where?: BlacklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blacklists to fetch.
     */
    orderBy?: BlacklistOrderByWithRelationInput | BlacklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlacklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blacklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blacklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blacklists
    **/
    _count?: true | BlacklistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlacklistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlacklistMaxAggregateInputType
  }

  export type GetBlacklistAggregateType<T extends BlacklistAggregateArgs> = {
        [P in keyof T & keyof AggregateBlacklist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlacklist[P]>
      : GetScalarType<T[P], AggregateBlacklist[P]>
  }




  export type BlacklistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlacklistWhereInput
    orderBy?: BlacklistOrderByWithAggregationInput | BlacklistOrderByWithAggregationInput[]
    by: BlacklistScalarFieldEnum[] | BlacklistScalarFieldEnum
    having?: BlacklistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlacklistCountAggregateInputType | true
    _min?: BlacklistMinAggregateInputType
    _max?: BlacklistMaxAggregateInputType
  }

  export type BlacklistGroupByOutputType = {
    id: string
    reason: string | null
    _count: BlacklistCountAggregateOutputType | null
    _min: BlacklistMinAggregateOutputType | null
    _max: BlacklistMaxAggregateOutputType | null
  }

  type GetBlacklistGroupByPayload<T extends BlacklistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlacklistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlacklistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlacklistGroupByOutputType[P]>
            : GetScalarType<T[P], BlacklistGroupByOutputType[P]>
        }
      >
    >


  export type BlacklistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reason?: boolean
  }, ExtArgs["result"]["blacklist"]>



  export type BlacklistSelectScalar = {
    id?: boolean
    reason?: boolean
  }

  export type BlacklistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reason", ExtArgs["result"]["blacklist"]>

  export type $BlacklistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Blacklist"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reason: string | null
    }, ExtArgs["result"]["blacklist"]>
    composites: {}
  }

  type BlacklistGetPayload<S extends boolean | null | undefined | BlacklistDefaultArgs> = $Result.GetResult<Prisma.$BlacklistPayload, S>

  type BlacklistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlacklistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlacklistCountAggregateInputType | true
    }

  export interface BlacklistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Blacklist'], meta: { name: 'Blacklist' } }
    /**
     * Find zero or one Blacklist that matches the filter.
     * @param {BlacklistFindUniqueArgs} args - Arguments to find a Blacklist
     * @example
     * // Get one Blacklist
     * const blacklist = await prisma.blacklist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlacklistFindUniqueArgs>(args: SelectSubset<T, BlacklistFindUniqueArgs<ExtArgs>>): Prisma__BlacklistClient<$Result.GetResult<Prisma.$BlacklistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Blacklist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlacklistFindUniqueOrThrowArgs} args - Arguments to find a Blacklist
     * @example
     * // Get one Blacklist
     * const blacklist = await prisma.blacklist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlacklistFindUniqueOrThrowArgs>(args: SelectSubset<T, BlacklistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlacklistClient<$Result.GetResult<Prisma.$BlacklistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blacklist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistFindFirstArgs} args - Arguments to find a Blacklist
     * @example
     * // Get one Blacklist
     * const blacklist = await prisma.blacklist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlacklistFindFirstArgs>(args?: SelectSubset<T, BlacklistFindFirstArgs<ExtArgs>>): Prisma__BlacklistClient<$Result.GetResult<Prisma.$BlacklistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blacklist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistFindFirstOrThrowArgs} args - Arguments to find a Blacklist
     * @example
     * // Get one Blacklist
     * const blacklist = await prisma.blacklist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlacklistFindFirstOrThrowArgs>(args?: SelectSubset<T, BlacklistFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlacklistClient<$Result.GetResult<Prisma.$BlacklistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Blacklists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blacklists
     * const blacklists = await prisma.blacklist.findMany()
     * 
     * // Get first 10 Blacklists
     * const blacklists = await prisma.blacklist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blacklistWithIdOnly = await prisma.blacklist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlacklistFindManyArgs>(args?: SelectSubset<T, BlacklistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlacklistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Blacklist.
     * @param {BlacklistCreateArgs} args - Arguments to create a Blacklist.
     * @example
     * // Create one Blacklist
     * const Blacklist = await prisma.blacklist.create({
     *   data: {
     *     // ... data to create a Blacklist
     *   }
     * })
     * 
     */
    create<T extends BlacklistCreateArgs>(args: SelectSubset<T, BlacklistCreateArgs<ExtArgs>>): Prisma__BlacklistClient<$Result.GetResult<Prisma.$BlacklistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Blacklists.
     * @param {BlacklistCreateManyArgs} args - Arguments to create many Blacklists.
     * @example
     * // Create many Blacklists
     * const blacklist = await prisma.blacklist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlacklistCreateManyArgs>(args?: SelectSubset<T, BlacklistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Blacklist.
     * @param {BlacklistDeleteArgs} args - Arguments to delete one Blacklist.
     * @example
     * // Delete one Blacklist
     * const Blacklist = await prisma.blacklist.delete({
     *   where: {
     *     // ... filter to delete one Blacklist
     *   }
     * })
     * 
     */
    delete<T extends BlacklistDeleteArgs>(args: SelectSubset<T, BlacklistDeleteArgs<ExtArgs>>): Prisma__BlacklistClient<$Result.GetResult<Prisma.$BlacklistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Blacklist.
     * @param {BlacklistUpdateArgs} args - Arguments to update one Blacklist.
     * @example
     * // Update one Blacklist
     * const blacklist = await prisma.blacklist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlacklistUpdateArgs>(args: SelectSubset<T, BlacklistUpdateArgs<ExtArgs>>): Prisma__BlacklistClient<$Result.GetResult<Prisma.$BlacklistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Blacklists.
     * @param {BlacklistDeleteManyArgs} args - Arguments to filter Blacklists to delete.
     * @example
     * // Delete a few Blacklists
     * const { count } = await prisma.blacklist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlacklistDeleteManyArgs>(args?: SelectSubset<T, BlacklistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blacklists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blacklists
     * const blacklist = await prisma.blacklist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlacklistUpdateManyArgs>(args: SelectSubset<T, BlacklistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Blacklist.
     * @param {BlacklistUpsertArgs} args - Arguments to update or create a Blacklist.
     * @example
     * // Update or create a Blacklist
     * const blacklist = await prisma.blacklist.upsert({
     *   create: {
     *     // ... data to create a Blacklist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Blacklist we want to update
     *   }
     * })
     */
    upsert<T extends BlacklistUpsertArgs>(args: SelectSubset<T, BlacklistUpsertArgs<ExtArgs>>): Prisma__BlacklistClient<$Result.GetResult<Prisma.$BlacklistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Blacklists that matches the filter.
     * @param {BlacklistFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const blacklist = await prisma.blacklist.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: BlacklistFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Blacklist.
     * @param {BlacklistAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const blacklist = await prisma.blacklist.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: BlacklistAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Blacklists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistCountArgs} args - Arguments to filter Blacklists to count.
     * @example
     * // Count the number of Blacklists
     * const count = await prisma.blacklist.count({
     *   where: {
     *     // ... the filter for the Blacklists we want to count
     *   }
     * })
    **/
    count<T extends BlacklistCountArgs>(
      args?: Subset<T, BlacklistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlacklistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Blacklist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlacklistAggregateArgs>(args: Subset<T, BlacklistAggregateArgs>): Prisma.PrismaPromise<GetBlacklistAggregateType<T>>

    /**
     * Group by Blacklist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlacklistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlacklistGroupByArgs['orderBy'] }
        : { orderBy?: BlacklistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlacklistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlacklistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Blacklist model
   */
  readonly fields: BlacklistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Blacklist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlacklistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Blacklist model
   */
  interface BlacklistFieldRefs {
    readonly id: FieldRef<"Blacklist", 'String'>
    readonly reason: FieldRef<"Blacklist", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Blacklist findUnique
   */
  export type BlacklistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
    /**
     * Filter, which Blacklist to fetch.
     */
    where: BlacklistWhereUniqueInput
  }

  /**
   * Blacklist findUniqueOrThrow
   */
  export type BlacklistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
    /**
     * Filter, which Blacklist to fetch.
     */
    where: BlacklistWhereUniqueInput
  }

  /**
   * Blacklist findFirst
   */
  export type BlacklistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
    /**
     * Filter, which Blacklist to fetch.
     */
    where?: BlacklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blacklists to fetch.
     */
    orderBy?: BlacklistOrderByWithRelationInput | BlacklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blacklists.
     */
    cursor?: BlacklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blacklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blacklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blacklists.
     */
    distinct?: BlacklistScalarFieldEnum | BlacklistScalarFieldEnum[]
  }

  /**
   * Blacklist findFirstOrThrow
   */
  export type BlacklistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
    /**
     * Filter, which Blacklist to fetch.
     */
    where?: BlacklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blacklists to fetch.
     */
    orderBy?: BlacklistOrderByWithRelationInput | BlacklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blacklists.
     */
    cursor?: BlacklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blacklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blacklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blacklists.
     */
    distinct?: BlacklistScalarFieldEnum | BlacklistScalarFieldEnum[]
  }

  /**
   * Blacklist findMany
   */
  export type BlacklistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
    /**
     * Filter, which Blacklists to fetch.
     */
    where?: BlacklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blacklists to fetch.
     */
    orderBy?: BlacklistOrderByWithRelationInput | BlacklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blacklists.
     */
    cursor?: BlacklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blacklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blacklists.
     */
    skip?: number
    distinct?: BlacklistScalarFieldEnum | BlacklistScalarFieldEnum[]
  }

  /**
   * Blacklist create
   */
  export type BlacklistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
    /**
     * The data needed to create a Blacklist.
     */
    data: XOR<BlacklistCreateInput, BlacklistUncheckedCreateInput>
  }

  /**
   * Blacklist createMany
   */
  export type BlacklistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Blacklists.
     */
    data: BlacklistCreateManyInput | BlacklistCreateManyInput[]
  }

  /**
   * Blacklist update
   */
  export type BlacklistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
    /**
     * The data needed to update a Blacklist.
     */
    data: XOR<BlacklistUpdateInput, BlacklistUncheckedUpdateInput>
    /**
     * Choose, which Blacklist to update.
     */
    where: BlacklistWhereUniqueInput
  }

  /**
   * Blacklist updateMany
   */
  export type BlacklistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Blacklists.
     */
    data: XOR<BlacklistUpdateManyMutationInput, BlacklistUncheckedUpdateManyInput>
    /**
     * Filter which Blacklists to update
     */
    where?: BlacklistWhereInput
    /**
     * Limit how many Blacklists to update.
     */
    limit?: number
  }

  /**
   * Blacklist upsert
   */
  export type BlacklistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
    /**
     * The filter to search for the Blacklist to update in case it exists.
     */
    where: BlacklistWhereUniqueInput
    /**
     * In case the Blacklist found by the `where` argument doesn't exist, create a new Blacklist with this data.
     */
    create: XOR<BlacklistCreateInput, BlacklistUncheckedCreateInput>
    /**
     * In case the Blacklist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlacklistUpdateInput, BlacklistUncheckedUpdateInput>
  }

  /**
   * Blacklist delete
   */
  export type BlacklistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
    /**
     * Filter which Blacklist to delete.
     */
    where: BlacklistWhereUniqueInput
  }

  /**
   * Blacklist deleteMany
   */
  export type BlacklistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blacklists to delete
     */
    where?: BlacklistWhereInput
    /**
     * Limit how many Blacklists to delete.
     */
    limit?: number
  }

  /**
   * Blacklist findRaw
   */
  export type BlacklistFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Blacklist aggregateRaw
   */
  export type BlacklistAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Blacklist without action
   */
  export type BlacklistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blacklist
     */
    select?: BlacklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blacklist
     */
    omit?: BlacklistOmit<ExtArgs> | null
  }


  /**
   * Model Phonebook
   */

  export type AggregatePhonebook = {
    _count: PhonebookCountAggregateOutputType | null
    _min: PhonebookMinAggregateOutputType | null
    _max: PhonebookMaxAggregateOutputType | null
  }

  export type PhonebookMinAggregateOutputType = {
    number: string | null
    description: string | null
  }

  export type PhonebookMaxAggregateOutputType = {
    number: string | null
    description: string | null
  }

  export type PhonebookCountAggregateOutputType = {
    number: number
    description: number
    _all: number
  }


  export type PhonebookMinAggregateInputType = {
    number?: true
    description?: true
  }

  export type PhonebookMaxAggregateInputType = {
    number?: true
    description?: true
  }

  export type PhonebookCountAggregateInputType = {
    number?: true
    description?: true
    _all?: true
  }

  export type PhonebookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Phonebook to aggregate.
     */
    where?: PhonebookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phonebooks to fetch.
     */
    orderBy?: PhonebookOrderByWithRelationInput | PhonebookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhonebookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phonebooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phonebooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Phonebooks
    **/
    _count?: true | PhonebookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhonebookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhonebookMaxAggregateInputType
  }

  export type GetPhonebookAggregateType<T extends PhonebookAggregateArgs> = {
        [P in keyof T & keyof AggregatePhonebook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhonebook[P]>
      : GetScalarType<T[P], AggregatePhonebook[P]>
  }




  export type PhonebookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhonebookWhereInput
    orderBy?: PhonebookOrderByWithAggregationInput | PhonebookOrderByWithAggregationInput[]
    by: PhonebookScalarFieldEnum[] | PhonebookScalarFieldEnum
    having?: PhonebookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhonebookCountAggregateInputType | true
    _min?: PhonebookMinAggregateInputType
    _max?: PhonebookMaxAggregateInputType
  }

  export type PhonebookGroupByOutputType = {
    number: string
    description: string
    _count: PhonebookCountAggregateOutputType | null
    _min: PhonebookMinAggregateOutputType | null
    _max: PhonebookMaxAggregateOutputType | null
  }

  type GetPhonebookGroupByPayload<T extends PhonebookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhonebookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhonebookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhonebookGroupByOutputType[P]>
            : GetScalarType<T[P], PhonebookGroupByOutputType[P]>
        }
      >
    >


  export type PhonebookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number?: boolean
    description?: boolean
    numberDoc?: boolean | NumbersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["phonebook"]>



  export type PhonebookSelectScalar = {
    number?: boolean
    description?: boolean
  }

  export type PhonebookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number" | "description", ExtArgs["result"]["phonebook"]>
  export type PhonebookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    numberDoc?: boolean | NumbersDefaultArgs<ExtArgs>
  }

  export type $PhonebookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Phonebook"
    objects: {
      numberDoc: Prisma.$NumbersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      number: string
      description: string
    }, ExtArgs["result"]["phonebook"]>
    composites: {}
  }

  type PhonebookGetPayload<S extends boolean | null | undefined | PhonebookDefaultArgs> = $Result.GetResult<Prisma.$PhonebookPayload, S>

  type PhonebookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhonebookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhonebookCountAggregateInputType | true
    }

  export interface PhonebookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Phonebook'], meta: { name: 'Phonebook' } }
    /**
     * Find zero or one Phonebook that matches the filter.
     * @param {PhonebookFindUniqueArgs} args - Arguments to find a Phonebook
     * @example
     * // Get one Phonebook
     * const phonebook = await prisma.phonebook.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhonebookFindUniqueArgs>(args: SelectSubset<T, PhonebookFindUniqueArgs<ExtArgs>>): Prisma__PhonebookClient<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Phonebook that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhonebookFindUniqueOrThrowArgs} args - Arguments to find a Phonebook
     * @example
     * // Get one Phonebook
     * const phonebook = await prisma.phonebook.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhonebookFindUniqueOrThrowArgs>(args: SelectSubset<T, PhonebookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhonebookClient<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Phonebook that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhonebookFindFirstArgs} args - Arguments to find a Phonebook
     * @example
     * // Get one Phonebook
     * const phonebook = await prisma.phonebook.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhonebookFindFirstArgs>(args?: SelectSubset<T, PhonebookFindFirstArgs<ExtArgs>>): Prisma__PhonebookClient<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Phonebook that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhonebookFindFirstOrThrowArgs} args - Arguments to find a Phonebook
     * @example
     * // Get one Phonebook
     * const phonebook = await prisma.phonebook.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhonebookFindFirstOrThrowArgs>(args?: SelectSubset<T, PhonebookFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhonebookClient<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Phonebooks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhonebookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Phonebooks
     * const phonebooks = await prisma.phonebook.findMany()
     * 
     * // Get first 10 Phonebooks
     * const phonebooks = await prisma.phonebook.findMany({ take: 10 })
     * 
     * // Only select the `number`
     * const phonebookWithNumberOnly = await prisma.phonebook.findMany({ select: { number: true } })
     * 
     */
    findMany<T extends PhonebookFindManyArgs>(args?: SelectSubset<T, PhonebookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Phonebook.
     * @param {PhonebookCreateArgs} args - Arguments to create a Phonebook.
     * @example
     * // Create one Phonebook
     * const Phonebook = await prisma.phonebook.create({
     *   data: {
     *     // ... data to create a Phonebook
     *   }
     * })
     * 
     */
    create<T extends PhonebookCreateArgs>(args: SelectSubset<T, PhonebookCreateArgs<ExtArgs>>): Prisma__PhonebookClient<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Phonebooks.
     * @param {PhonebookCreateManyArgs} args - Arguments to create many Phonebooks.
     * @example
     * // Create many Phonebooks
     * const phonebook = await prisma.phonebook.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhonebookCreateManyArgs>(args?: SelectSubset<T, PhonebookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Phonebook.
     * @param {PhonebookDeleteArgs} args - Arguments to delete one Phonebook.
     * @example
     * // Delete one Phonebook
     * const Phonebook = await prisma.phonebook.delete({
     *   where: {
     *     // ... filter to delete one Phonebook
     *   }
     * })
     * 
     */
    delete<T extends PhonebookDeleteArgs>(args: SelectSubset<T, PhonebookDeleteArgs<ExtArgs>>): Prisma__PhonebookClient<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Phonebook.
     * @param {PhonebookUpdateArgs} args - Arguments to update one Phonebook.
     * @example
     * // Update one Phonebook
     * const phonebook = await prisma.phonebook.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhonebookUpdateArgs>(args: SelectSubset<T, PhonebookUpdateArgs<ExtArgs>>): Prisma__PhonebookClient<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Phonebooks.
     * @param {PhonebookDeleteManyArgs} args - Arguments to filter Phonebooks to delete.
     * @example
     * // Delete a few Phonebooks
     * const { count } = await prisma.phonebook.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhonebookDeleteManyArgs>(args?: SelectSubset<T, PhonebookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Phonebooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhonebookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Phonebooks
     * const phonebook = await prisma.phonebook.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhonebookUpdateManyArgs>(args: SelectSubset<T, PhonebookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Phonebook.
     * @param {PhonebookUpsertArgs} args - Arguments to update or create a Phonebook.
     * @example
     * // Update or create a Phonebook
     * const phonebook = await prisma.phonebook.upsert({
     *   create: {
     *     // ... data to create a Phonebook
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Phonebook we want to update
     *   }
     * })
     */
    upsert<T extends PhonebookUpsertArgs>(args: SelectSubset<T, PhonebookUpsertArgs<ExtArgs>>): Prisma__PhonebookClient<$Result.GetResult<Prisma.$PhonebookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Phonebooks that matches the filter.
     * @param {PhonebookFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const phonebook = await prisma.phonebook.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PhonebookFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Phonebook.
     * @param {PhonebookAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const phonebook = await prisma.phonebook.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PhonebookAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Phonebooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhonebookCountArgs} args - Arguments to filter Phonebooks to count.
     * @example
     * // Count the number of Phonebooks
     * const count = await prisma.phonebook.count({
     *   where: {
     *     // ... the filter for the Phonebooks we want to count
     *   }
     * })
    **/
    count<T extends PhonebookCountArgs>(
      args?: Subset<T, PhonebookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhonebookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Phonebook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhonebookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PhonebookAggregateArgs>(args: Subset<T, PhonebookAggregateArgs>): Prisma.PrismaPromise<GetPhonebookAggregateType<T>>

    /**
     * Group by Phonebook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhonebookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PhonebookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhonebookGroupByArgs['orderBy'] }
        : { orderBy?: PhonebookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PhonebookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhonebookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Phonebook model
   */
  readonly fields: PhonebookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Phonebook.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhonebookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    numberDoc<T extends NumbersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NumbersDefaultArgs<ExtArgs>>): Prisma__NumbersClient<$Result.GetResult<Prisma.$NumbersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Phonebook model
   */
  interface PhonebookFieldRefs {
    readonly number: FieldRef<"Phonebook", 'String'>
    readonly description: FieldRef<"Phonebook", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Phonebook findUnique
   */
  export type PhonebookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    /**
     * Filter, which Phonebook to fetch.
     */
    where: PhonebookWhereUniqueInput
  }

  /**
   * Phonebook findUniqueOrThrow
   */
  export type PhonebookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    /**
     * Filter, which Phonebook to fetch.
     */
    where: PhonebookWhereUniqueInput
  }

  /**
   * Phonebook findFirst
   */
  export type PhonebookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    /**
     * Filter, which Phonebook to fetch.
     */
    where?: PhonebookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phonebooks to fetch.
     */
    orderBy?: PhonebookOrderByWithRelationInput | PhonebookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phonebooks.
     */
    cursor?: PhonebookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phonebooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phonebooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phonebooks.
     */
    distinct?: PhonebookScalarFieldEnum | PhonebookScalarFieldEnum[]
  }

  /**
   * Phonebook findFirstOrThrow
   */
  export type PhonebookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    /**
     * Filter, which Phonebook to fetch.
     */
    where?: PhonebookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phonebooks to fetch.
     */
    orderBy?: PhonebookOrderByWithRelationInput | PhonebookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phonebooks.
     */
    cursor?: PhonebookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phonebooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phonebooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phonebooks.
     */
    distinct?: PhonebookScalarFieldEnum | PhonebookScalarFieldEnum[]
  }

  /**
   * Phonebook findMany
   */
  export type PhonebookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    /**
     * Filter, which Phonebooks to fetch.
     */
    where?: PhonebookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phonebooks to fetch.
     */
    orderBy?: PhonebookOrderByWithRelationInput | PhonebookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Phonebooks.
     */
    cursor?: PhonebookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phonebooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phonebooks.
     */
    skip?: number
    distinct?: PhonebookScalarFieldEnum | PhonebookScalarFieldEnum[]
  }

  /**
   * Phonebook create
   */
  export type PhonebookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    /**
     * The data needed to create a Phonebook.
     */
    data: XOR<PhonebookCreateInput, PhonebookUncheckedCreateInput>
  }

  /**
   * Phonebook createMany
   */
  export type PhonebookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Phonebooks.
     */
    data: PhonebookCreateManyInput | PhonebookCreateManyInput[]
  }

  /**
   * Phonebook update
   */
  export type PhonebookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    /**
     * The data needed to update a Phonebook.
     */
    data: XOR<PhonebookUpdateInput, PhonebookUncheckedUpdateInput>
    /**
     * Choose, which Phonebook to update.
     */
    where: PhonebookWhereUniqueInput
  }

  /**
   * Phonebook updateMany
   */
  export type PhonebookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Phonebooks.
     */
    data: XOR<PhonebookUpdateManyMutationInput, PhonebookUncheckedUpdateManyInput>
    /**
     * Filter which Phonebooks to update
     */
    where?: PhonebookWhereInput
    /**
     * Limit how many Phonebooks to update.
     */
    limit?: number
  }

  /**
   * Phonebook upsert
   */
  export type PhonebookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    /**
     * The filter to search for the Phonebook to update in case it exists.
     */
    where: PhonebookWhereUniqueInput
    /**
     * In case the Phonebook found by the `where` argument doesn't exist, create a new Phonebook with this data.
     */
    create: XOR<PhonebookCreateInput, PhonebookUncheckedCreateInput>
    /**
     * In case the Phonebook was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhonebookUpdateInput, PhonebookUncheckedUpdateInput>
  }

  /**
   * Phonebook delete
   */
  export type PhonebookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
    /**
     * Filter which Phonebook to delete.
     */
    where: PhonebookWhereUniqueInput
  }

  /**
   * Phonebook deleteMany
   */
  export type PhonebookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Phonebooks to delete
     */
    where?: PhonebookWhereInput
    /**
     * Limit how many Phonebooks to delete.
     */
    limit?: number
  }

  /**
   * Phonebook findRaw
   */
  export type PhonebookFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Phonebook aggregateRaw
   */
  export type PhonebookAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Phonebook without action
   */
  export type PhonebookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phonebook
     */
    select?: PhonebookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phonebook
     */
    omit?: PhonebookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhonebookInclude<ExtArgs> | null
  }


  /**
   * Model Promote
   */

  export type AggregatePromote = {
    _count: PromoteCountAggregateOutputType | null
    _min: PromoteMinAggregateOutputType | null
    _max: PromoteMaxAggregateOutputType | null
  }

  export type PromoteMinAggregateOutputType = {
    number: string | null
    renderableNumber: string | null
    lastPromoMsgID: string | null
  }

  export type PromoteMaxAggregateOutputType = {
    number: string | null
    renderableNumber: string | null
    lastPromoMsgID: string | null
  }

  export type PromoteCountAggregateOutputType = {
    number: number
    renderableNumber: number
    lastPromoMsgID: number
    _all: number
  }


  export type PromoteMinAggregateInputType = {
    number?: true
    renderableNumber?: true
    lastPromoMsgID?: true
  }

  export type PromoteMaxAggregateInputType = {
    number?: true
    renderableNumber?: true
    lastPromoMsgID?: true
  }

  export type PromoteCountAggregateInputType = {
    number?: true
    renderableNumber?: true
    lastPromoMsgID?: true
    _all?: true
  }

  export type PromoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promote to aggregate.
     */
    where?: PromoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotes to fetch.
     */
    orderBy?: PromoteOrderByWithRelationInput | PromoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Promotes
    **/
    _count?: true | PromoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromoteMaxAggregateInputType
  }

  export type GetPromoteAggregateType<T extends PromoteAggregateArgs> = {
        [P in keyof T & keyof AggregatePromote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromote[P]>
      : GetScalarType<T[P], AggregatePromote[P]>
  }




  export type PromoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoteWhereInput
    orderBy?: PromoteOrderByWithAggregationInput | PromoteOrderByWithAggregationInput[]
    by: PromoteScalarFieldEnum[] | PromoteScalarFieldEnum
    having?: PromoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromoteCountAggregateInputType | true
    _min?: PromoteMinAggregateInputType
    _max?: PromoteMaxAggregateInputType
  }

  export type PromoteGroupByOutputType = {
    number: string
    renderableNumber: string
    lastPromoMsgID: string | null
    _count: PromoteCountAggregateOutputType | null
    _min: PromoteMinAggregateOutputType | null
    _max: PromoteMaxAggregateOutputType | null
  }

  type GetPromoteGroupByPayload<T extends PromoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromoteGroupByOutputType[P]>
            : GetScalarType<T[P], PromoteGroupByOutputType[P]>
        }
      >
    >


  export type PromoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    number?: boolean
    renderableNumber?: boolean
    lastPromoMsgID?: boolean
  }, ExtArgs["result"]["promote"]>



  export type PromoteSelectScalar = {
    number?: boolean
    renderableNumber?: boolean
    lastPromoMsgID?: boolean
  }

  export type PromoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"number" | "renderableNumber" | "lastPromoMsgID", ExtArgs["result"]["promote"]>

  export type $PromotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Promote"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      number: string
      renderableNumber: string
      lastPromoMsgID: string | null
    }, ExtArgs["result"]["promote"]>
    composites: {}
  }

  type PromoteGetPayload<S extends boolean | null | undefined | PromoteDefaultArgs> = $Result.GetResult<Prisma.$PromotePayload, S>

  type PromoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromoteCountAggregateInputType | true
    }

  export interface PromoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Promote'], meta: { name: 'Promote' } }
    /**
     * Find zero or one Promote that matches the filter.
     * @param {PromoteFindUniqueArgs} args - Arguments to find a Promote
     * @example
     * // Get one Promote
     * const promote = await prisma.promote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromoteFindUniqueArgs>(args: SelectSubset<T, PromoteFindUniqueArgs<ExtArgs>>): Prisma__PromoteClient<$Result.GetResult<Prisma.$PromotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Promote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromoteFindUniqueOrThrowArgs} args - Arguments to find a Promote
     * @example
     * // Get one Promote
     * const promote = await prisma.promote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromoteFindUniqueOrThrowArgs>(args: SelectSubset<T, PromoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromoteClient<$Result.GetResult<Prisma.$PromotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoteFindFirstArgs} args - Arguments to find a Promote
     * @example
     * // Get one Promote
     * const promote = await prisma.promote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromoteFindFirstArgs>(args?: SelectSubset<T, PromoteFindFirstArgs<ExtArgs>>): Prisma__PromoteClient<$Result.GetResult<Prisma.$PromotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoteFindFirstOrThrowArgs} args - Arguments to find a Promote
     * @example
     * // Get one Promote
     * const promote = await prisma.promote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromoteFindFirstOrThrowArgs>(args?: SelectSubset<T, PromoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromoteClient<$Result.GetResult<Prisma.$PromotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Promotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Promotes
     * const promotes = await prisma.promote.findMany()
     * 
     * // Get first 10 Promotes
     * const promotes = await prisma.promote.findMany({ take: 10 })
     * 
     * // Only select the `number`
     * const promoteWithNumberOnly = await prisma.promote.findMany({ select: { number: true } })
     * 
     */
    findMany<T extends PromoteFindManyArgs>(args?: SelectSubset<T, PromoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Promote.
     * @param {PromoteCreateArgs} args - Arguments to create a Promote.
     * @example
     * // Create one Promote
     * const Promote = await prisma.promote.create({
     *   data: {
     *     // ... data to create a Promote
     *   }
     * })
     * 
     */
    create<T extends PromoteCreateArgs>(args: SelectSubset<T, PromoteCreateArgs<ExtArgs>>): Prisma__PromoteClient<$Result.GetResult<Prisma.$PromotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Promotes.
     * @param {PromoteCreateManyArgs} args - Arguments to create many Promotes.
     * @example
     * // Create many Promotes
     * const promote = await prisma.promote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromoteCreateManyArgs>(args?: SelectSubset<T, PromoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Promote.
     * @param {PromoteDeleteArgs} args - Arguments to delete one Promote.
     * @example
     * // Delete one Promote
     * const Promote = await prisma.promote.delete({
     *   where: {
     *     // ... filter to delete one Promote
     *   }
     * })
     * 
     */
    delete<T extends PromoteDeleteArgs>(args: SelectSubset<T, PromoteDeleteArgs<ExtArgs>>): Prisma__PromoteClient<$Result.GetResult<Prisma.$PromotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Promote.
     * @param {PromoteUpdateArgs} args - Arguments to update one Promote.
     * @example
     * // Update one Promote
     * const promote = await prisma.promote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromoteUpdateArgs>(args: SelectSubset<T, PromoteUpdateArgs<ExtArgs>>): Prisma__PromoteClient<$Result.GetResult<Prisma.$PromotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Promotes.
     * @param {PromoteDeleteManyArgs} args - Arguments to filter Promotes to delete.
     * @example
     * // Delete a few Promotes
     * const { count } = await prisma.promote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromoteDeleteManyArgs>(args?: SelectSubset<T, PromoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Promotes
     * const promote = await prisma.promote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromoteUpdateManyArgs>(args: SelectSubset<T, PromoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Promote.
     * @param {PromoteUpsertArgs} args - Arguments to update or create a Promote.
     * @example
     * // Update or create a Promote
     * const promote = await prisma.promote.upsert({
     *   create: {
     *     // ... data to create a Promote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Promote we want to update
     *   }
     * })
     */
    upsert<T extends PromoteUpsertArgs>(args: SelectSubset<T, PromoteUpsertArgs<ExtArgs>>): Prisma__PromoteClient<$Result.GetResult<Prisma.$PromotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Promotes that matches the filter.
     * @param {PromoteFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const promote = await prisma.promote.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PromoteFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Promote.
     * @param {PromoteAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const promote = await prisma.promote.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PromoteAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Promotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoteCountArgs} args - Arguments to filter Promotes to count.
     * @example
     * // Count the number of Promotes
     * const count = await prisma.promote.count({
     *   where: {
     *     // ... the filter for the Promotes we want to count
     *   }
     * })
    **/
    count<T extends PromoteCountArgs>(
      args?: Subset<T, PromoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Promote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromoteAggregateArgs>(args: Subset<T, PromoteAggregateArgs>): Prisma.PrismaPromise<GetPromoteAggregateType<T>>

    /**
     * Group by Promote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromoteGroupByArgs['orderBy'] }
        : { orderBy?: PromoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Promote model
   */
  readonly fields: PromoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Promote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Promote model
   */
  interface PromoteFieldRefs {
    readonly number: FieldRef<"Promote", 'String'>
    readonly renderableNumber: FieldRef<"Promote", 'String'>
    readonly lastPromoMsgID: FieldRef<"Promote", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Promote findUnique
   */
  export type PromoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
    /**
     * Filter, which Promote to fetch.
     */
    where: PromoteWhereUniqueInput
  }

  /**
   * Promote findUniqueOrThrow
   */
  export type PromoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
    /**
     * Filter, which Promote to fetch.
     */
    where: PromoteWhereUniqueInput
  }

  /**
   * Promote findFirst
   */
  export type PromoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
    /**
     * Filter, which Promote to fetch.
     */
    where?: PromoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotes to fetch.
     */
    orderBy?: PromoteOrderByWithRelationInput | PromoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promotes.
     */
    cursor?: PromoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promotes.
     */
    distinct?: PromoteScalarFieldEnum | PromoteScalarFieldEnum[]
  }

  /**
   * Promote findFirstOrThrow
   */
  export type PromoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
    /**
     * Filter, which Promote to fetch.
     */
    where?: PromoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotes to fetch.
     */
    orderBy?: PromoteOrderByWithRelationInput | PromoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promotes.
     */
    cursor?: PromoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promotes.
     */
    distinct?: PromoteScalarFieldEnum | PromoteScalarFieldEnum[]
  }

  /**
   * Promote findMany
   */
  export type PromoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
    /**
     * Filter, which Promotes to fetch.
     */
    where?: PromoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotes to fetch.
     */
    orderBy?: PromoteOrderByWithRelationInput | PromoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Promotes.
     */
    cursor?: PromoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotes.
     */
    skip?: number
    distinct?: PromoteScalarFieldEnum | PromoteScalarFieldEnum[]
  }

  /**
   * Promote create
   */
  export type PromoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
    /**
     * The data needed to create a Promote.
     */
    data: XOR<PromoteCreateInput, PromoteUncheckedCreateInput>
  }

  /**
   * Promote createMany
   */
  export type PromoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Promotes.
     */
    data: PromoteCreateManyInput | PromoteCreateManyInput[]
  }

  /**
   * Promote update
   */
  export type PromoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
    /**
     * The data needed to update a Promote.
     */
    data: XOR<PromoteUpdateInput, PromoteUncheckedUpdateInput>
    /**
     * Choose, which Promote to update.
     */
    where: PromoteWhereUniqueInput
  }

  /**
   * Promote updateMany
   */
  export type PromoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Promotes.
     */
    data: XOR<PromoteUpdateManyMutationInput, PromoteUncheckedUpdateManyInput>
    /**
     * Filter which Promotes to update
     */
    where?: PromoteWhereInput
    /**
     * Limit how many Promotes to update.
     */
    limit?: number
  }

  /**
   * Promote upsert
   */
  export type PromoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
    /**
     * The filter to search for the Promote to update in case it exists.
     */
    where: PromoteWhereUniqueInput
    /**
     * In case the Promote found by the `where` argument doesn't exist, create a new Promote with this data.
     */
    create: XOR<PromoteCreateInput, PromoteUncheckedCreateInput>
    /**
     * In case the Promote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromoteUpdateInput, PromoteUncheckedUpdateInput>
  }

  /**
   * Promote delete
   */
  export type PromoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
    /**
     * Filter which Promote to delete.
     */
    where: PromoteWhereUniqueInput
  }

  /**
   * Promote deleteMany
   */
  export type PromoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promotes to delete
     */
    where?: PromoteWhereInput
    /**
     * Limit how many Promotes to delete.
     */
    limit?: number
  }

  /**
   * Promote findRaw
   */
  export type PromoteFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Promote aggregateRaw
   */
  export type PromoteAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Promote without action
   */
  export type PromoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promote
     */
    select?: PromoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promote
     */
    omit?: PromoteOmit<ExtArgs> | null
  }


  /**
   * Model Votes
   */

  export type AggregateVotes = {
    _count: VotesCountAggregateOutputType | null
    _avg: VotesAvgAggregateOutputType | null
    _sum: VotesSumAggregateOutputType | null
    _min: VotesMinAggregateOutputType | null
    _max: VotesMaxAggregateOutputType | null
  }

  export type VotesAvgAggregateOutputType = {
    count: number | null
  }

  export type VotesSumAggregateOutputType = {
    count: number | null
  }

  export type VotesMinAggregateOutputType = {
    userID: string | null
    count: number | null
  }

  export type VotesMaxAggregateOutputType = {
    userID: string | null
    count: number | null
  }

  export type VotesCountAggregateOutputType = {
    userID: number
    count: number
    _all: number
  }


  export type VotesAvgAggregateInputType = {
    count?: true
  }

  export type VotesSumAggregateInputType = {
    count?: true
  }

  export type VotesMinAggregateInputType = {
    userID?: true
    count?: true
  }

  export type VotesMaxAggregateInputType = {
    userID?: true
    count?: true
  }

  export type VotesCountAggregateInputType = {
    userID?: true
    count?: true
    _all?: true
  }

  export type VotesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to aggregate.
     */
    where?: VotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Votes
    **/
    _count?: true | VotesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VotesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VotesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VotesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VotesMaxAggregateInputType
  }

  export type GetVotesAggregateType<T extends VotesAggregateArgs> = {
        [P in keyof T & keyof AggregateVotes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVotes[P]>
      : GetScalarType<T[P], AggregateVotes[P]>
  }




  export type VotesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VotesWhereInput
    orderBy?: VotesOrderByWithAggregationInput | VotesOrderByWithAggregationInput[]
    by: VotesScalarFieldEnum[] | VotesScalarFieldEnum
    having?: VotesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VotesCountAggregateInputType | true
    _avg?: VotesAvgAggregateInputType
    _sum?: VotesSumAggregateInputType
    _min?: VotesMinAggregateInputType
    _max?: VotesMaxAggregateInputType
  }

  export type VotesGroupByOutputType = {
    userID: string
    count: number
    _count: VotesCountAggregateOutputType | null
    _avg: VotesAvgAggregateOutputType | null
    _sum: VotesSumAggregateOutputType | null
    _min: VotesMinAggregateOutputType | null
    _max: VotesMaxAggregateOutputType | null
  }

  type GetVotesGroupByPayload<T extends VotesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VotesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VotesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VotesGroupByOutputType[P]>
            : GetScalarType<T[P], VotesGroupByOutputType[P]>
        }
      >
    >


  export type VotesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userID?: boolean
    count?: boolean
    account?: boolean | AccountsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["votes"]>



  export type VotesSelectScalar = {
    userID?: boolean
    count?: boolean
  }

  export type VotesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userID" | "count", ExtArgs["result"]["votes"]>
  export type VotesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountsDefaultArgs<ExtArgs>
  }

  export type $VotesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Votes"
    objects: {
      account: Prisma.$AccountsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userID: string
      count: number
    }, ExtArgs["result"]["votes"]>
    composites: {}
  }

  type VotesGetPayload<S extends boolean | null | undefined | VotesDefaultArgs> = $Result.GetResult<Prisma.$VotesPayload, S>

  type VotesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VotesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VotesCountAggregateInputType | true
    }

  export interface VotesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Votes'], meta: { name: 'Votes' } }
    /**
     * Find zero or one Votes that matches the filter.
     * @param {VotesFindUniqueArgs} args - Arguments to find a Votes
     * @example
     * // Get one Votes
     * const votes = await prisma.votes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VotesFindUniqueArgs>(args: SelectSubset<T, VotesFindUniqueArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Votes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VotesFindUniqueOrThrowArgs} args - Arguments to find a Votes
     * @example
     * // Get one Votes
     * const votes = await prisma.votes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VotesFindUniqueOrThrowArgs>(args: SelectSubset<T, VotesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesFindFirstArgs} args - Arguments to find a Votes
     * @example
     * // Get one Votes
     * const votes = await prisma.votes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VotesFindFirstArgs>(args?: SelectSubset<T, VotesFindFirstArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Votes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesFindFirstOrThrowArgs} args - Arguments to find a Votes
     * @example
     * // Get one Votes
     * const votes = await prisma.votes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VotesFindFirstOrThrowArgs>(args?: SelectSubset<T, VotesFindFirstOrThrowArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Votes
     * const votes = await prisma.votes.findMany()
     * 
     * // Get first 10 Votes
     * const votes = await prisma.votes.findMany({ take: 10 })
     * 
     * // Only select the `userID`
     * const votesWithUserIDOnly = await prisma.votes.findMany({ select: { userID: true } })
     * 
     */
    findMany<T extends VotesFindManyArgs>(args?: SelectSubset<T, VotesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Votes.
     * @param {VotesCreateArgs} args - Arguments to create a Votes.
     * @example
     * // Create one Votes
     * const Votes = await prisma.votes.create({
     *   data: {
     *     // ... data to create a Votes
     *   }
     * })
     * 
     */
    create<T extends VotesCreateArgs>(args: SelectSubset<T, VotesCreateArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Votes.
     * @param {VotesCreateManyArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const votes = await prisma.votes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VotesCreateManyArgs>(args?: SelectSubset<T, VotesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Votes.
     * @param {VotesDeleteArgs} args - Arguments to delete one Votes.
     * @example
     * // Delete one Votes
     * const Votes = await prisma.votes.delete({
     *   where: {
     *     // ... filter to delete one Votes
     *   }
     * })
     * 
     */
    delete<T extends VotesDeleteArgs>(args: SelectSubset<T, VotesDeleteArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Votes.
     * @param {VotesUpdateArgs} args - Arguments to update one Votes.
     * @example
     * // Update one Votes
     * const votes = await prisma.votes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VotesUpdateArgs>(args: SelectSubset<T, VotesUpdateArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Votes.
     * @param {VotesDeleteManyArgs} args - Arguments to filter Votes to delete.
     * @example
     * // Delete a few Votes
     * const { count } = await prisma.votes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VotesDeleteManyArgs>(args?: SelectSubset<T, VotesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Votes
     * const votes = await prisma.votes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VotesUpdateManyArgs>(args: SelectSubset<T, VotesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Votes.
     * @param {VotesUpsertArgs} args - Arguments to update or create a Votes.
     * @example
     * // Update or create a Votes
     * const votes = await prisma.votes.upsert({
     *   create: {
     *     // ... data to create a Votes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Votes we want to update
     *   }
     * })
     */
    upsert<T extends VotesUpsertArgs>(args: SelectSubset<T, VotesUpsertArgs<ExtArgs>>): Prisma__VotesClient<$Result.GetResult<Prisma.$VotesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Votes that matches the filter.
     * @param {VotesFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const votes = await prisma.votes.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: VotesFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Votes.
     * @param {VotesAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const votes = await prisma.votes.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: VotesAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesCountArgs} args - Arguments to filter Votes to count.
     * @example
     * // Count the number of Votes
     * const count = await prisma.votes.count({
     *   where: {
     *     // ... the filter for the Votes we want to count
     *   }
     * })
    **/
    count<T extends VotesCountArgs>(
      args?: Subset<T, VotesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VotesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VotesAggregateArgs>(args: Subset<T, VotesAggregateArgs>): Prisma.PrismaPromise<GetVotesAggregateType<T>>

    /**
     * Group by Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VotesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VotesGroupByArgs['orderBy'] }
        : { orderBy?: VotesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VotesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVotesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Votes model
   */
  readonly fields: VotesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Votes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VotesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends AccountsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountsDefaultArgs<ExtArgs>>): Prisma__AccountsClient<$Result.GetResult<Prisma.$AccountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Votes model
   */
  interface VotesFieldRefs {
    readonly userID: FieldRef<"Votes", 'String'>
    readonly count: FieldRef<"Votes", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Votes findUnique
   */
  export type VotesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where: VotesWhereUniqueInput
  }

  /**
   * Votes findUniqueOrThrow
   */
  export type VotesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where: VotesWhereUniqueInput
  }

  /**
   * Votes findFirst
   */
  export type VotesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VotesScalarFieldEnum | VotesScalarFieldEnum[]
  }

  /**
   * Votes findFirstOrThrow
   */
  export type VotesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VotesScalarFieldEnum | VotesScalarFieldEnum[]
  }

  /**
   * Votes findMany
   */
  export type VotesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VotesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VotesOrderByWithRelationInput | VotesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Votes.
     */
    cursor?: VotesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    distinct?: VotesScalarFieldEnum | VotesScalarFieldEnum[]
  }

  /**
   * Votes create
   */
  export type VotesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * The data needed to create a Votes.
     */
    data: XOR<VotesCreateInput, VotesUncheckedCreateInput>
  }

  /**
   * Votes createMany
   */
  export type VotesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Votes.
     */
    data: VotesCreateManyInput | VotesCreateManyInput[]
  }

  /**
   * Votes update
   */
  export type VotesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * The data needed to update a Votes.
     */
    data: XOR<VotesUpdateInput, VotesUncheckedUpdateInput>
    /**
     * Choose, which Votes to update.
     */
    where: VotesWhereUniqueInput
  }

  /**
   * Votes updateMany
   */
  export type VotesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Votes.
     */
    data: XOR<VotesUpdateManyMutationInput, VotesUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VotesWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
  }

  /**
   * Votes upsert
   */
  export type VotesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * The filter to search for the Votes to update in case it exists.
     */
    where: VotesWhereUniqueInput
    /**
     * In case the Votes found by the `where` argument doesn't exist, create a new Votes with this data.
     */
    create: XOR<VotesCreateInput, VotesUncheckedCreateInput>
    /**
     * In case the Votes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VotesUpdateInput, VotesUncheckedUpdateInput>
  }

  /**
   * Votes delete
   */
  export type VotesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
    /**
     * Filter which Votes to delete.
     */
    where: VotesWhereUniqueInput
  }

  /**
   * Votes deleteMany
   */
  export type VotesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to delete
     */
    where?: VotesWhereInput
    /**
     * Limit how many Votes to delete.
     */
    limit?: number
  }

  /**
   * Votes findRaw
   */
  export type VotesFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Votes aggregateRaw
   */
  export type VotesAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Votes without action
   */
  export type VotesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Votes
     */
    select?: VotesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Votes
     */
    omit?: VotesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const MailboxScalarFieldEnum: {
    number: 'number',
    autoreply: 'autoreply',
    receiving: 'receiving'
  };

  export type MailboxScalarFieldEnum = (typeof MailboxScalarFieldEnum)[keyof typeof MailboxScalarFieldEnum]


  export const NumbersScalarFieldEnum: {
    number: 'number',
    channelID: 'channelID',
    guildID: 'guildID',
    userID: 'userID',
    blocked: 'blocked',
    expiry: 'expiry',
    mentions: 'mentions',
    waiting: 'waiting',
    createdAt: 'createdAt',
    fka: 'fka'
  };

  export type NumbersScalarFieldEnum = (typeof NumbersScalarFieldEnum)[keyof typeof NumbersScalarFieldEnum]


  export const CallMessagesScalarFieldEnum: {
    id: 'id',
    callID: 'callID',
    forwardedMessageID: 'forwardedMessageID',
    originalMessageID: 'originalMessageID',
    sentAt: 'sentAt',
    sender: 'sender'
  };

  export type CallMessagesScalarFieldEnum = (typeof CallMessagesScalarFieldEnum)[keyof typeof CallMessagesScalarFieldEnum]


  export const ActiveCallsScalarFieldEnum: {
    id: 'id',
    toNum: 'toNum',
    fromNum: 'fromNum',
    randomCall: 'randomCall'
  };

  export type ActiveCallsScalarFieldEnum = (typeof ActiveCallsScalarFieldEnum)[keyof typeof ActiveCallsScalarFieldEnum]


  export const ArchivedCallsScalarFieldEnum: {
    id: 'id',
    toNum: 'toNum',
    fromNum: 'fromNum',
    randomCall: 'randomCall'
  };

  export type ArchivedCallsScalarFieldEnum = (typeof ArchivedCallsScalarFieldEnum)[keyof typeof ArchivedCallsScalarFieldEnum]


  export const GuildConfigsScalarFieldEnum: {
    id: 'id',
    whitelisted: 'whitelisted',
    locale: 'locale'
  };

  export type GuildConfigsScalarFieldEnum = (typeof GuildConfigsScalarFieldEnum)[keyof typeof GuildConfigsScalarFieldEnum]


  export const AccountsScalarFieldEnum: {
    id: 'id',
    balance: 'balance',
    dailyClaimedAt: 'dailyClaimedAt',
    vipMonthsRemaining: 'vipMonthsRemaining'
  };

  export type AccountsScalarFieldEnum = (typeof AccountsScalarFieldEnum)[keyof typeof AccountsScalarFieldEnum]


  export const StrikesScalarFieldEnum: {
    id: 'id',
    offender: 'offender',
    reason: 'reason',
    type: 'type'
  };

  export type StrikesScalarFieldEnum = (typeof StrikesScalarFieldEnum)[keyof typeof StrikesScalarFieldEnum]


  export const BlacklistScalarFieldEnum: {
    id: 'id',
    reason: 'reason'
  };

  export type BlacklistScalarFieldEnum = (typeof BlacklistScalarFieldEnum)[keyof typeof BlacklistScalarFieldEnum]


  export const PhonebookScalarFieldEnum: {
    number: 'number',
    description: 'description'
  };

  export type PhonebookScalarFieldEnum = (typeof PhonebookScalarFieldEnum)[keyof typeof PhonebookScalarFieldEnum]


  export const PromoteScalarFieldEnum: {
    number: 'number',
    renderableNumber: 'renderableNumber',
    lastPromoMsgID: 'lastPromoMsgID'
  };

  export type PromoteScalarFieldEnum = (typeof PromoteScalarFieldEnum)[keyof typeof PromoteScalarFieldEnum]


  export const VotesScalarFieldEnum: {
    userID: 'userID',
    count: 'count'
  };

  export type VotesScalarFieldEnum = (typeof VotesScalarFieldEnum)[keyof typeof VotesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'StrikeOffenderType'
   */
  export type EnumStrikeOffenderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StrikeOffenderType'>
    


  /**
   * Reference to a field of type 'StrikeOffenderType[]'
   */
  export type ListEnumStrikeOffenderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StrikeOffenderType[]'>
    
  /**
   * Deep Input Types
   */


  export type MailboxWhereInput = {
    AND?: MailboxWhereInput | MailboxWhereInput[]
    OR?: MailboxWhereInput[]
    NOT?: MailboxWhereInput | MailboxWhereInput[]
    number?: StringFilter<"Mailbox"> | string
    autoreply?: StringFilter<"Mailbox"> | string
    receiving?: BoolFilter<"Mailbox"> | boolean
    messages?: MailboxMessageCompositeListFilter | mailboxMessageObjectEqualityInput[]
    numberDoc?: XOR<NumbersNullableScalarRelationFilter, NumbersWhereInput> | null
  }

  export type MailboxOrderByWithRelationInput = {
    number?: SortOrder
    autoreply?: SortOrder
    receiving?: SortOrder
    messages?: mailboxMessageOrderByCompositeAggregateInput
    numberDoc?: NumbersOrderByWithRelationInput
  }

  export type MailboxWhereUniqueInput = Prisma.AtLeast<{
    number?: string
    AND?: MailboxWhereInput | MailboxWhereInput[]
    OR?: MailboxWhereInput[]
    NOT?: MailboxWhereInput | MailboxWhereInput[]
    autoreply?: StringFilter<"Mailbox"> | string
    receiving?: BoolFilter<"Mailbox"> | boolean
    messages?: MailboxMessageCompositeListFilter | mailboxMessageObjectEqualityInput[]
    numberDoc?: XOR<NumbersNullableScalarRelationFilter, NumbersWhereInput> | null
  }, "number">

  export type MailboxOrderByWithAggregationInput = {
    number?: SortOrder
    autoreply?: SortOrder
    receiving?: SortOrder
    _count?: MailboxCountOrderByAggregateInput
    _max?: MailboxMaxOrderByAggregateInput
    _min?: MailboxMinOrderByAggregateInput
  }

  export type MailboxScalarWhereWithAggregatesInput = {
    AND?: MailboxScalarWhereWithAggregatesInput | MailboxScalarWhereWithAggregatesInput[]
    OR?: MailboxScalarWhereWithAggregatesInput[]
    NOT?: MailboxScalarWhereWithAggregatesInput | MailboxScalarWhereWithAggregatesInput[]
    number?: StringWithAggregatesFilter<"Mailbox"> | string
    autoreply?: StringWithAggregatesFilter<"Mailbox"> | string
    receiving?: BoolWithAggregatesFilter<"Mailbox"> | boolean
  }

  export type NumbersWhereInput = {
    AND?: NumbersWhereInput | NumbersWhereInput[]
    OR?: NumbersWhereInput[]
    NOT?: NumbersWhereInput | NumbersWhereInput[]
    number?: StringFilter<"Numbers"> | string
    channelID?: StringFilter<"Numbers"> | string
    guildID?: StringNullableFilter<"Numbers"> | string | null
    userID?: StringNullableFilter<"Numbers"> | string | null
    blocked?: StringNullableListFilter<"Numbers">
    contacts?: ContactCompositeListFilter | ContactObjectEqualityInput[]
    expiry?: DateTimeFilter<"Numbers"> | Date | string
    mentions?: StringNullableListFilter<"Numbers">
    vip?: XOR<NumberVIPNullableCompositeFilter, numberVIPObjectEqualityInput> | null
    waiting?: BoolFilter<"Numbers"> | boolean
    createdAt?: DateTimeFilter<"Numbers"> | Date | string
    fka?: StringNullableListFilter<"Numbers">
    mailbox?: XOR<MailboxNullableScalarRelationFilter, MailboxWhereInput> | null
    outgoingCalls?: ActiveCallsListRelationFilter
    incomingCalls?: ActiveCallsListRelationFilter
    guild?: XOR<GuildConfigsNullableScalarRelationFilter, GuildConfigsWhereInput> | null
    phonebook?: XOR<PhonebookNullableScalarRelationFilter, PhonebookWhereInput> | null
  }

  export type NumbersOrderByWithRelationInput = {
    number?: SortOrder
    channelID?: SortOrder
    guildID?: SortOrder
    userID?: SortOrder
    blocked?: SortOrder
    contacts?: ContactOrderByCompositeAggregateInput
    expiry?: SortOrder
    mentions?: SortOrder
    vip?: numberVIPOrderByInput
    waiting?: SortOrder
    createdAt?: SortOrder
    fka?: SortOrder
    mailbox?: MailboxOrderByWithRelationInput
    outgoingCalls?: ActiveCallsOrderByRelationAggregateInput
    incomingCalls?: ActiveCallsOrderByRelationAggregateInput
    guild?: GuildConfigsOrderByWithRelationInput
    phonebook?: PhonebookOrderByWithRelationInput
  }

  export type NumbersWhereUniqueInput = Prisma.AtLeast<{
    number?: string
    channelID?: string
    AND?: NumbersWhereInput | NumbersWhereInput[]
    OR?: NumbersWhereInput[]
    NOT?: NumbersWhereInput | NumbersWhereInput[]
    guildID?: StringNullableFilter<"Numbers"> | string | null
    userID?: StringNullableFilter<"Numbers"> | string | null
    blocked?: StringNullableListFilter<"Numbers">
    contacts?: ContactCompositeListFilter | ContactObjectEqualityInput[]
    expiry?: DateTimeFilter<"Numbers"> | Date | string
    mentions?: StringNullableListFilter<"Numbers">
    vip?: XOR<NumberVIPNullableCompositeFilter, numberVIPObjectEqualityInput> | null
    waiting?: BoolFilter<"Numbers"> | boolean
    createdAt?: DateTimeFilter<"Numbers"> | Date | string
    fka?: StringNullableListFilter<"Numbers">
    mailbox?: XOR<MailboxNullableScalarRelationFilter, MailboxWhereInput> | null
    outgoingCalls?: ActiveCallsListRelationFilter
    incomingCalls?: ActiveCallsListRelationFilter
    guild?: XOR<GuildConfigsNullableScalarRelationFilter, GuildConfigsWhereInput> | null
    phonebook?: XOR<PhonebookNullableScalarRelationFilter, PhonebookWhereInput> | null
  }, "number" | "channel">

  export type NumbersOrderByWithAggregationInput = {
    number?: SortOrder
    channelID?: SortOrder
    guildID?: SortOrder
    userID?: SortOrder
    blocked?: SortOrder
    expiry?: SortOrder
    mentions?: SortOrder
    waiting?: SortOrder
    createdAt?: SortOrder
    fka?: SortOrder
    _count?: NumbersCountOrderByAggregateInput
    _max?: NumbersMaxOrderByAggregateInput
    _min?: NumbersMinOrderByAggregateInput
  }

  export type NumbersScalarWhereWithAggregatesInput = {
    AND?: NumbersScalarWhereWithAggregatesInput | NumbersScalarWhereWithAggregatesInput[]
    OR?: NumbersScalarWhereWithAggregatesInput[]
    NOT?: NumbersScalarWhereWithAggregatesInput | NumbersScalarWhereWithAggregatesInput[]
    number?: StringWithAggregatesFilter<"Numbers"> | string
    channelID?: StringWithAggregatesFilter<"Numbers"> | string
    guildID?: StringNullableWithAggregatesFilter<"Numbers"> | string | null
    userID?: StringNullableWithAggregatesFilter<"Numbers"> | string | null
    blocked?: StringNullableListFilter<"Numbers">
    expiry?: DateTimeWithAggregatesFilter<"Numbers"> | Date | string
    mentions?: StringNullableListFilter<"Numbers">
    waiting?: BoolWithAggregatesFilter<"Numbers"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Numbers"> | Date | string
    fka?: StringNullableListFilter<"Numbers">
  }

  export type CallMessagesWhereInput = {
    AND?: CallMessagesWhereInput | CallMessagesWhereInput[]
    OR?: CallMessagesWhereInput[]
    NOT?: CallMessagesWhereInput | CallMessagesWhereInput[]
    id?: StringFilter<"CallMessages"> | string
    callID?: StringFilter<"CallMessages"> | string
    forwardedMessageID?: StringFilter<"CallMessages"> | string
    originalMessageID?: StringFilter<"CallMessages"> | string
    sentAt?: DateTimeFilter<"CallMessages"> | Date | string
    sender?: StringFilter<"CallMessages"> | string
  }

  export type CallMessagesOrderByWithRelationInput = {
    id?: SortOrder
    callID?: SortOrder
    forwardedMessageID?: SortOrder
    originalMessageID?: SortOrder
    sentAt?: SortOrder
    sender?: SortOrder
  }

  export type CallMessagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    forwardedMessageID?: string
    originalMessageID?: string
    AND?: CallMessagesWhereInput | CallMessagesWhereInput[]
    OR?: CallMessagesWhereInput[]
    NOT?: CallMessagesWhereInput | CallMessagesWhereInput[]
    callID?: StringFilter<"CallMessages"> | string
    sentAt?: DateTimeFilter<"CallMessages"> | Date | string
    sender?: StringFilter<"CallMessages"> | string
  }, "id" | "forwardedMessageID" | "originalMessageID">

  export type CallMessagesOrderByWithAggregationInput = {
    id?: SortOrder
    callID?: SortOrder
    forwardedMessageID?: SortOrder
    originalMessageID?: SortOrder
    sentAt?: SortOrder
    sender?: SortOrder
    _count?: CallMessagesCountOrderByAggregateInput
    _max?: CallMessagesMaxOrderByAggregateInput
    _min?: CallMessagesMinOrderByAggregateInput
  }

  export type CallMessagesScalarWhereWithAggregatesInput = {
    AND?: CallMessagesScalarWhereWithAggregatesInput | CallMessagesScalarWhereWithAggregatesInput[]
    OR?: CallMessagesScalarWhereWithAggregatesInput[]
    NOT?: CallMessagesScalarWhereWithAggregatesInput | CallMessagesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CallMessages"> | string
    callID?: StringWithAggregatesFilter<"CallMessages"> | string
    forwardedMessageID?: StringWithAggregatesFilter<"CallMessages"> | string
    originalMessageID?: StringWithAggregatesFilter<"CallMessages"> | string
    sentAt?: DateTimeWithAggregatesFilter<"CallMessages"> | Date | string
    sender?: StringWithAggregatesFilter<"CallMessages"> | string
  }

  export type ActiveCallsWhereInput = {
    AND?: ActiveCallsWhereInput | ActiveCallsWhereInput[]
    OR?: ActiveCallsWhereInput[]
    NOT?: ActiveCallsWhereInput | ActiveCallsWhereInput[]
    id?: StringFilter<"ActiveCalls"> | string
    toNum?: StringFilter<"ActiveCalls"> | string
    fromNum?: StringFilter<"ActiveCalls"> | string
    pickedUp?: XOR<AtAndByNullableCompositeFilter, atAndByObjectEqualityInput> | null
    randomCall?: BoolFilter<"ActiveCalls"> | boolean
    started?: XOR<AtAndByCompositeFilter, atAndByObjectEqualityInput>
    ended?: XOR<AtAndByNullableCompositeFilter, atAndByObjectEqualityInput> | null
    hold?: XOR<OnHoldCompositeFilter, onHoldObjectEqualityInput>
    to?: XOR<NumbersNullableScalarRelationFilter, NumbersWhereInput> | null
    from?: XOR<NumbersNullableScalarRelationFilter, NumbersWhereInput> | null
  }

  export type ActiveCallsOrderByWithRelationInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    pickedUp?: atAndByOrderByInput
    randomCall?: SortOrder
    started?: atAndByOrderByInput
    ended?: atAndByOrderByInput
    hold?: onHoldOrderByInput
    to?: NumbersOrderByWithRelationInput
    from?: NumbersOrderByWithRelationInput
  }

  export type ActiveCallsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActiveCallsWhereInput | ActiveCallsWhereInput[]
    OR?: ActiveCallsWhereInput[]
    NOT?: ActiveCallsWhereInput | ActiveCallsWhereInput[]
    toNum?: StringFilter<"ActiveCalls"> | string
    fromNum?: StringFilter<"ActiveCalls"> | string
    pickedUp?: XOR<AtAndByNullableCompositeFilter, atAndByObjectEqualityInput> | null
    randomCall?: BoolFilter<"ActiveCalls"> | boolean
    started?: XOR<AtAndByCompositeFilter, atAndByObjectEqualityInput>
    ended?: XOR<AtAndByNullableCompositeFilter, atAndByObjectEqualityInput> | null
    hold?: XOR<OnHoldCompositeFilter, onHoldObjectEqualityInput>
    to?: XOR<NumbersNullableScalarRelationFilter, NumbersWhereInput> | null
    from?: XOR<NumbersNullableScalarRelationFilter, NumbersWhereInput> | null
  }, "id">

  export type ActiveCallsOrderByWithAggregationInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    randomCall?: SortOrder
    _count?: ActiveCallsCountOrderByAggregateInput
    _max?: ActiveCallsMaxOrderByAggregateInput
    _min?: ActiveCallsMinOrderByAggregateInput
  }

  export type ActiveCallsScalarWhereWithAggregatesInput = {
    AND?: ActiveCallsScalarWhereWithAggregatesInput | ActiveCallsScalarWhereWithAggregatesInput[]
    OR?: ActiveCallsScalarWhereWithAggregatesInput[]
    NOT?: ActiveCallsScalarWhereWithAggregatesInput | ActiveCallsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActiveCalls"> | string
    toNum?: StringWithAggregatesFilter<"ActiveCalls"> | string
    fromNum?: StringWithAggregatesFilter<"ActiveCalls"> | string
    randomCall?: BoolWithAggregatesFilter<"ActiveCalls"> | boolean
  }

  export type ArchivedCallsWhereInput = {
    AND?: ArchivedCallsWhereInput | ArchivedCallsWhereInput[]
    OR?: ArchivedCallsWhereInput[]
    NOT?: ArchivedCallsWhereInput | ArchivedCallsWhereInput[]
    id?: StringFilter<"ArchivedCalls"> | string
    toNum?: StringFilter<"ArchivedCalls"> | string
    fromNum?: StringFilter<"ArchivedCalls"> | string
    pickedUp?: XOR<AtAndByNullableCompositeFilter, atAndByObjectEqualityInput> | null
    randomCall?: BoolFilter<"ArchivedCalls"> | boolean
    started?: XOR<AtAndByCompositeFilter, atAndByObjectEqualityInput>
    ended?: XOR<AtAndByCompositeFilter, atAndByObjectEqualityInput>
    hold?: XOR<OnHoldCompositeFilter, onHoldObjectEqualityInput>
  }

  export type ArchivedCallsOrderByWithRelationInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    pickedUp?: atAndByOrderByInput
    randomCall?: SortOrder
    started?: atAndByOrderByInput
    ended?: atAndByOrderByInput
    hold?: onHoldOrderByInput
  }

  export type ArchivedCallsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArchivedCallsWhereInput | ArchivedCallsWhereInput[]
    OR?: ArchivedCallsWhereInput[]
    NOT?: ArchivedCallsWhereInput | ArchivedCallsWhereInput[]
    toNum?: StringFilter<"ArchivedCalls"> | string
    fromNum?: StringFilter<"ArchivedCalls"> | string
    pickedUp?: XOR<AtAndByNullableCompositeFilter, atAndByObjectEqualityInput> | null
    randomCall?: BoolFilter<"ArchivedCalls"> | boolean
    started?: XOR<AtAndByCompositeFilter, atAndByObjectEqualityInput>
    ended?: XOR<AtAndByCompositeFilter, atAndByObjectEqualityInput>
    hold?: XOR<OnHoldCompositeFilter, onHoldObjectEqualityInput>
  }, "id">

  export type ArchivedCallsOrderByWithAggregationInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    randomCall?: SortOrder
    _count?: ArchivedCallsCountOrderByAggregateInput
    _max?: ArchivedCallsMaxOrderByAggregateInput
    _min?: ArchivedCallsMinOrderByAggregateInput
  }

  export type ArchivedCallsScalarWhereWithAggregatesInput = {
    AND?: ArchivedCallsScalarWhereWithAggregatesInput | ArchivedCallsScalarWhereWithAggregatesInput[]
    OR?: ArchivedCallsScalarWhereWithAggregatesInput[]
    NOT?: ArchivedCallsScalarWhereWithAggregatesInput | ArchivedCallsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArchivedCalls"> | string
    toNum?: StringWithAggregatesFilter<"ArchivedCalls"> | string
    fromNum?: StringWithAggregatesFilter<"ArchivedCalls"> | string
    randomCall?: BoolWithAggregatesFilter<"ArchivedCalls"> | boolean
  }

  export type GuildConfigsWhereInput = {
    AND?: GuildConfigsWhereInput | GuildConfigsWhereInput[]
    OR?: GuildConfigsWhereInput[]
    NOT?: GuildConfigsWhereInput | GuildConfigsWhereInput[]
    id?: StringFilter<"GuildConfigs"> | string
    whitelisted?: BoolFilter<"GuildConfigs"> | boolean
    locale?: StringFilter<"GuildConfigs"> | string
    numbers?: NumbersListRelationFilter
    strikes?: StrikesListRelationFilter
  }

  export type GuildConfigsOrderByWithRelationInput = {
    id?: SortOrder
    whitelisted?: SortOrder
    locale?: SortOrder
    numbers?: NumbersOrderByRelationAggregateInput
    strikes?: StrikesOrderByRelationAggregateInput
  }

  export type GuildConfigsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GuildConfigsWhereInput | GuildConfigsWhereInput[]
    OR?: GuildConfigsWhereInput[]
    NOT?: GuildConfigsWhereInput | GuildConfigsWhereInput[]
    whitelisted?: BoolFilter<"GuildConfigs"> | boolean
    locale?: StringFilter<"GuildConfigs"> | string
    numbers?: NumbersListRelationFilter
    strikes?: StrikesListRelationFilter
  }, "id">

  export type GuildConfigsOrderByWithAggregationInput = {
    id?: SortOrder
    whitelisted?: SortOrder
    locale?: SortOrder
    _count?: GuildConfigsCountOrderByAggregateInput
    _max?: GuildConfigsMaxOrderByAggregateInput
    _min?: GuildConfigsMinOrderByAggregateInput
  }

  export type GuildConfigsScalarWhereWithAggregatesInput = {
    AND?: GuildConfigsScalarWhereWithAggregatesInput | GuildConfigsScalarWhereWithAggregatesInput[]
    OR?: GuildConfigsScalarWhereWithAggregatesInput[]
    NOT?: GuildConfigsScalarWhereWithAggregatesInput | GuildConfigsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GuildConfigs"> | string
    whitelisted?: BoolWithAggregatesFilter<"GuildConfigs"> | boolean
    locale?: StringWithAggregatesFilter<"GuildConfigs"> | string
  }

  export type AccountsWhereInput = {
    AND?: AccountsWhereInput | AccountsWhereInput[]
    OR?: AccountsWhereInput[]
    NOT?: AccountsWhereInput | AccountsWhereInput[]
    id?: StringFilter<"Accounts"> | string
    balance?: FloatFilter<"Accounts"> | number
    dailyClaimedAt?: DateTimeNullableFilter<"Accounts"> | Date | string | null
    vipMonthsRemaining?: IntFilter<"Accounts"> | number
    strikes?: StrikesListRelationFilter
    Votes?: XOR<VotesNullableScalarRelationFilter, VotesWhereInput> | null
  }

  export type AccountsOrderByWithRelationInput = {
    id?: SortOrder
    balance?: SortOrder
    dailyClaimedAt?: SortOrder
    vipMonthsRemaining?: SortOrder
    strikes?: StrikesOrderByRelationAggregateInput
    Votes?: VotesOrderByWithRelationInput
  }

  export type AccountsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountsWhereInput | AccountsWhereInput[]
    OR?: AccountsWhereInput[]
    NOT?: AccountsWhereInput | AccountsWhereInput[]
    balance?: FloatFilter<"Accounts"> | number
    dailyClaimedAt?: DateTimeNullableFilter<"Accounts"> | Date | string | null
    vipMonthsRemaining?: IntFilter<"Accounts"> | number
    strikes?: StrikesListRelationFilter
    Votes?: XOR<VotesNullableScalarRelationFilter, VotesWhereInput> | null
  }, "id">

  export type AccountsOrderByWithAggregationInput = {
    id?: SortOrder
    balance?: SortOrder
    dailyClaimedAt?: SortOrder
    vipMonthsRemaining?: SortOrder
    _count?: AccountsCountOrderByAggregateInput
    _avg?: AccountsAvgOrderByAggregateInput
    _max?: AccountsMaxOrderByAggregateInput
    _min?: AccountsMinOrderByAggregateInput
    _sum?: AccountsSumOrderByAggregateInput
  }

  export type AccountsScalarWhereWithAggregatesInput = {
    AND?: AccountsScalarWhereWithAggregatesInput | AccountsScalarWhereWithAggregatesInput[]
    OR?: AccountsScalarWhereWithAggregatesInput[]
    NOT?: AccountsScalarWhereWithAggregatesInput | AccountsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Accounts"> | string
    balance?: FloatWithAggregatesFilter<"Accounts"> | number
    dailyClaimedAt?: DateTimeNullableWithAggregatesFilter<"Accounts"> | Date | string | null
    vipMonthsRemaining?: IntWithAggregatesFilter<"Accounts"> | number
  }

  export type StrikesWhereInput = {
    AND?: StrikesWhereInput | StrikesWhereInput[]
    OR?: StrikesWhereInput[]
    NOT?: StrikesWhereInput | StrikesWhereInput[]
    id?: StringFilter<"Strikes"> | string
    offender?: StringFilter<"Strikes"> | string
    reason?: StringFilter<"Strikes"> | string
    type?: EnumStrikeOffenderTypeFilter<"Strikes"> | $Enums.StrikeOffenderType
    created?: XOR<AtAndByCompositeFilter, atAndByObjectEqualityInput>
    account?: XOR<AccountsScalarRelationFilter, AccountsWhereInput>
    guildConfig?: XOR<GuildConfigsScalarRelationFilter, GuildConfigsWhereInput>
  }

  export type StrikesOrderByWithRelationInput = {
    id?: SortOrder
    offender?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    created?: atAndByOrderByInput
    account?: AccountsOrderByWithRelationInput
    guildConfig?: GuildConfigsOrderByWithRelationInput
  }

  export type StrikesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StrikesWhereInput | StrikesWhereInput[]
    OR?: StrikesWhereInput[]
    NOT?: StrikesWhereInput | StrikesWhereInput[]
    offender?: StringFilter<"Strikes"> | string
    reason?: StringFilter<"Strikes"> | string
    type?: EnumStrikeOffenderTypeFilter<"Strikes"> | $Enums.StrikeOffenderType
    created?: XOR<AtAndByCompositeFilter, atAndByObjectEqualityInput>
    account?: XOR<AccountsScalarRelationFilter, AccountsWhereInput>
    guildConfig?: XOR<GuildConfigsScalarRelationFilter, GuildConfigsWhereInput>
  }, "id">

  export type StrikesOrderByWithAggregationInput = {
    id?: SortOrder
    offender?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    _count?: StrikesCountOrderByAggregateInput
    _max?: StrikesMaxOrderByAggregateInput
    _min?: StrikesMinOrderByAggregateInput
  }

  export type StrikesScalarWhereWithAggregatesInput = {
    AND?: StrikesScalarWhereWithAggregatesInput | StrikesScalarWhereWithAggregatesInput[]
    OR?: StrikesScalarWhereWithAggregatesInput[]
    NOT?: StrikesScalarWhereWithAggregatesInput | StrikesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Strikes"> | string
    offender?: StringWithAggregatesFilter<"Strikes"> | string
    reason?: StringWithAggregatesFilter<"Strikes"> | string
    type?: EnumStrikeOffenderTypeWithAggregatesFilter<"Strikes"> | $Enums.StrikeOffenderType
  }

  export type BlacklistWhereInput = {
    AND?: BlacklistWhereInput | BlacklistWhereInput[]
    OR?: BlacklistWhereInput[]
    NOT?: BlacklistWhereInput | BlacklistWhereInput[]
    id?: StringFilter<"Blacklist"> | string
    reason?: StringNullableFilter<"Blacklist"> | string | null
  }

  export type BlacklistOrderByWithRelationInput = {
    id?: SortOrder
    reason?: SortOrder
  }

  export type BlacklistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BlacklistWhereInput | BlacklistWhereInput[]
    OR?: BlacklistWhereInput[]
    NOT?: BlacklistWhereInput | BlacklistWhereInput[]
    reason?: StringNullableFilter<"Blacklist"> | string | null
  }, "id">

  export type BlacklistOrderByWithAggregationInput = {
    id?: SortOrder
    reason?: SortOrder
    _count?: BlacklistCountOrderByAggregateInput
    _max?: BlacklistMaxOrderByAggregateInput
    _min?: BlacklistMinOrderByAggregateInput
  }

  export type BlacklistScalarWhereWithAggregatesInput = {
    AND?: BlacklistScalarWhereWithAggregatesInput | BlacklistScalarWhereWithAggregatesInput[]
    OR?: BlacklistScalarWhereWithAggregatesInput[]
    NOT?: BlacklistScalarWhereWithAggregatesInput | BlacklistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Blacklist"> | string
    reason?: StringNullableWithAggregatesFilter<"Blacklist"> | string | null
  }

  export type PhonebookWhereInput = {
    AND?: PhonebookWhereInput | PhonebookWhereInput[]
    OR?: PhonebookWhereInput[]
    NOT?: PhonebookWhereInput | PhonebookWhereInput[]
    number?: StringFilter<"Phonebook"> | string
    description?: StringFilter<"Phonebook"> | string
    numberDoc?: XOR<NumbersScalarRelationFilter, NumbersWhereInput>
  }

  export type PhonebookOrderByWithRelationInput = {
    number?: SortOrder
    description?: SortOrder
    numberDoc?: NumbersOrderByWithRelationInput
  }

  export type PhonebookWhereUniqueInput = Prisma.AtLeast<{
    number?: string
    AND?: PhonebookWhereInput | PhonebookWhereInput[]
    OR?: PhonebookWhereInput[]
    NOT?: PhonebookWhereInput | PhonebookWhereInput[]
    description?: StringFilter<"Phonebook"> | string
    numberDoc?: XOR<NumbersScalarRelationFilter, NumbersWhereInput>
  }, "number">

  export type PhonebookOrderByWithAggregationInput = {
    number?: SortOrder
    description?: SortOrder
    _count?: PhonebookCountOrderByAggregateInput
    _max?: PhonebookMaxOrderByAggregateInput
    _min?: PhonebookMinOrderByAggregateInput
  }

  export type PhonebookScalarWhereWithAggregatesInput = {
    AND?: PhonebookScalarWhereWithAggregatesInput | PhonebookScalarWhereWithAggregatesInput[]
    OR?: PhonebookScalarWhereWithAggregatesInput[]
    NOT?: PhonebookScalarWhereWithAggregatesInput | PhonebookScalarWhereWithAggregatesInput[]
    number?: StringWithAggregatesFilter<"Phonebook"> | string
    description?: StringWithAggregatesFilter<"Phonebook"> | string
  }

  export type PromoteWhereInput = {
    AND?: PromoteWhereInput | PromoteWhereInput[]
    OR?: PromoteWhereInput[]
    NOT?: PromoteWhereInput | PromoteWhereInput[]
    number?: StringFilter<"Promote"> | string
    renderableNumber?: StringFilter<"Promote"> | string
    lastPromoMsgID?: StringNullableFilter<"Promote"> | string | null
  }

  export type PromoteOrderByWithRelationInput = {
    number?: SortOrder
    renderableNumber?: SortOrder
    lastPromoMsgID?: SortOrder
  }

  export type PromoteWhereUniqueInput = Prisma.AtLeast<{
    number?: string
    AND?: PromoteWhereInput | PromoteWhereInput[]
    OR?: PromoteWhereInput[]
    NOT?: PromoteWhereInput | PromoteWhereInput[]
    renderableNumber?: StringFilter<"Promote"> | string
    lastPromoMsgID?: StringNullableFilter<"Promote"> | string | null
  }, "number">

  export type PromoteOrderByWithAggregationInput = {
    number?: SortOrder
    renderableNumber?: SortOrder
    lastPromoMsgID?: SortOrder
    _count?: PromoteCountOrderByAggregateInput
    _max?: PromoteMaxOrderByAggregateInput
    _min?: PromoteMinOrderByAggregateInput
  }

  export type PromoteScalarWhereWithAggregatesInput = {
    AND?: PromoteScalarWhereWithAggregatesInput | PromoteScalarWhereWithAggregatesInput[]
    OR?: PromoteScalarWhereWithAggregatesInput[]
    NOT?: PromoteScalarWhereWithAggregatesInput | PromoteScalarWhereWithAggregatesInput[]
    number?: StringWithAggregatesFilter<"Promote"> | string
    renderableNumber?: StringWithAggregatesFilter<"Promote"> | string
    lastPromoMsgID?: StringNullableWithAggregatesFilter<"Promote"> | string | null
  }

  export type VotesWhereInput = {
    AND?: VotesWhereInput | VotesWhereInput[]
    OR?: VotesWhereInput[]
    NOT?: VotesWhereInput | VotesWhereInput[]
    userID?: StringFilter<"Votes"> | string
    count?: IntFilter<"Votes"> | number
    account?: XOR<AccountsScalarRelationFilter, AccountsWhereInput>
  }

  export type VotesOrderByWithRelationInput = {
    userID?: SortOrder
    count?: SortOrder
    account?: AccountsOrderByWithRelationInput
  }

  export type VotesWhereUniqueInput = Prisma.AtLeast<{
    userID?: string
    AND?: VotesWhereInput | VotesWhereInput[]
    OR?: VotesWhereInput[]
    NOT?: VotesWhereInput | VotesWhereInput[]
    count?: IntFilter<"Votes"> | number
    account?: XOR<AccountsScalarRelationFilter, AccountsWhereInput>
  }, "userID">

  export type VotesOrderByWithAggregationInput = {
    userID?: SortOrder
    count?: SortOrder
    _count?: VotesCountOrderByAggregateInput
    _avg?: VotesAvgOrderByAggregateInput
    _max?: VotesMaxOrderByAggregateInput
    _min?: VotesMinOrderByAggregateInput
    _sum?: VotesSumOrderByAggregateInput
  }

  export type VotesScalarWhereWithAggregatesInput = {
    AND?: VotesScalarWhereWithAggregatesInput | VotesScalarWhereWithAggregatesInput[]
    OR?: VotesScalarWhereWithAggregatesInput[]
    NOT?: VotesScalarWhereWithAggregatesInput | VotesScalarWhereWithAggregatesInput[]
    userID?: StringWithAggregatesFilter<"Votes"> | string
    count?: IntWithAggregatesFilter<"Votes"> | number
  }

  export type MailboxCreateInput = {
    number: string
    autoreply?: string
    receiving?: boolean
    messages?: XOR<mailboxMessageListCreateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
    numberDoc?: NumbersCreateNestedOneWithoutMailboxInput
  }

  export type MailboxUncheckedCreateInput = {
    number: string
    autoreply?: string
    receiving?: boolean
    messages?: XOR<mailboxMessageListCreateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
    numberDoc?: NumbersUncheckedCreateNestedOneWithoutMailboxInput
  }

  export type MailboxUpdateInput = {
    autoreply?: StringFieldUpdateOperationsInput | string
    receiving?: BoolFieldUpdateOperationsInput | boolean
    messages?: XOR<mailboxMessageListUpdateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
    numberDoc?: NumbersUpdateOneWithoutMailboxNestedInput
  }

  export type MailboxUncheckedUpdateInput = {
    autoreply?: StringFieldUpdateOperationsInput | string
    receiving?: BoolFieldUpdateOperationsInput | boolean
    messages?: XOR<mailboxMessageListUpdateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
    numberDoc?: NumbersUncheckedUpdateOneWithoutMailboxNestedInput
  }

  export type MailboxCreateManyInput = {
    number: string
    autoreply?: string
    receiving?: boolean
    messages?: XOR<mailboxMessageListCreateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
  }

  export type MailboxUpdateManyMutationInput = {
    autoreply?: StringFieldUpdateOperationsInput | string
    receiving?: BoolFieldUpdateOperationsInput | boolean
    messages?: XOR<mailboxMessageListUpdateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
  }

  export type MailboxUncheckedUpdateManyInput = {
    autoreply?: StringFieldUpdateOperationsInput | string
    receiving?: BoolFieldUpdateOperationsInput | boolean
    messages?: XOR<mailboxMessageListUpdateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
  }

  export type NumbersCreateInput = {
    channelID: string
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    mailbox?: MailboxCreateNestedOneWithoutNumberDocInput
    outgoingCalls?: ActiveCallsCreateNestedManyWithoutToInput
    incomingCalls?: ActiveCallsCreateNestedManyWithoutFromInput
    guild?: GuildConfigsCreateNestedOneWithoutNumbersInput
    phonebook?: PhonebookCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersUncheckedCreateInput = {
    number: string
    channelID: string
    guildID?: string | null
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutToInput
    incomingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutFromInput
    phonebook?: PhonebookUncheckedCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersUpdateInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    mailbox?: MailboxUpdateOneWithoutNumberDocNestedInput
    outgoingCalls?: ActiveCallsUpdateManyWithoutToNestedInput
    incomingCalls?: ActiveCallsUpdateManyWithoutFromNestedInput
    guild?: GuildConfigsUpdateOneWithoutNumbersNestedInput
    phonebook?: PhonebookUpdateOneWithoutNumberDocNestedInput
  }

  export type NumbersUncheckedUpdateInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    guildID?: NullableStringFieldUpdateOperationsInput | string | null
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedUpdateManyWithoutToNestedInput
    incomingCalls?: ActiveCallsUncheckedUpdateManyWithoutFromNestedInput
    phonebook?: PhonebookUncheckedUpdateOneWithoutNumberDocNestedInput
  }

  export type NumbersCreateManyInput = {
    number: string
    channelID: string
    guildID?: string | null
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
  }

  export type NumbersUpdateManyMutationInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
  }

  export type NumbersUncheckedUpdateManyInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    guildID?: NullableStringFieldUpdateOperationsInput | string | null
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
  }

  export type CallMessagesCreateInput = {
    id?: string
    callID: string
    forwardedMessageID: string
    originalMessageID: string
    sentAt: Date | string
    sender: string
  }

  export type CallMessagesUncheckedCreateInput = {
    id?: string
    callID: string
    forwardedMessageID: string
    originalMessageID: string
    sentAt: Date | string
    sender: string
  }

  export type CallMessagesUpdateInput = {
    callID?: StringFieldUpdateOperationsInput | string
    forwardedMessageID?: StringFieldUpdateOperationsInput | string
    originalMessageID?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: StringFieldUpdateOperationsInput | string
  }

  export type CallMessagesUncheckedUpdateInput = {
    callID?: StringFieldUpdateOperationsInput | string
    forwardedMessageID?: StringFieldUpdateOperationsInput | string
    originalMessageID?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: StringFieldUpdateOperationsInput | string
  }

  export type CallMessagesCreateManyInput = {
    id?: string
    callID: string
    forwardedMessageID: string
    originalMessageID: string
    sentAt: Date | string
    sender: string
  }

  export type CallMessagesUpdateManyMutationInput = {
    callID?: StringFieldUpdateOperationsInput | string
    forwardedMessageID?: StringFieldUpdateOperationsInput | string
    originalMessageID?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: StringFieldUpdateOperationsInput | string
  }

  export type CallMessagesUncheckedUpdateManyInput = {
    callID?: StringFieldUpdateOperationsInput | string
    forwardedMessageID?: StringFieldUpdateOperationsInput | string
    originalMessageID?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveCallsCreateInput = {
    id: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
    to?: NumbersCreateNestedOneWithoutOutgoingCallsInput
    from?: NumbersCreateNestedOneWithoutIncomingCallsInput
  }

  export type ActiveCallsUncheckedCreateInput = {
    id: string
    toNum: string
    fromNum: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsUpdateInput = {
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
    to?: NumbersUpdateOneWithoutOutgoingCallsNestedInput
    from?: NumbersUpdateOneWithoutIncomingCallsNestedInput
  }

  export type ActiveCallsUncheckedUpdateInput = {
    toNum?: StringFieldUpdateOperationsInput | string
    fromNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsCreateManyInput = {
    id: string
    toNum: string
    fromNum: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsUpdateManyMutationInput = {
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsUncheckedUpdateManyInput = {
    toNum?: StringFieldUpdateOperationsInput | string
    fromNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type ArchivedCallsCreateInput = {
    id: string
    toNum: string
    fromNum: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
  }

  export type ArchivedCallsUncheckedCreateInput = {
    id: string
    toNum: string
    fromNum: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
  }

  export type ArchivedCallsUpdateInput = {
    toNum?: StringFieldUpdateOperationsInput | string
    fromNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type ArchivedCallsUncheckedUpdateInput = {
    toNum?: StringFieldUpdateOperationsInput | string
    fromNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type ArchivedCallsCreateManyInput = {
    id: string
    toNum: string
    fromNum: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
  }

  export type ArchivedCallsUpdateManyMutationInput = {
    toNum?: StringFieldUpdateOperationsInput | string
    fromNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type ArchivedCallsUncheckedUpdateManyInput = {
    toNum?: StringFieldUpdateOperationsInput | string
    fromNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type GuildConfigsCreateInput = {
    id: string
    whitelisted?: boolean
    locale?: string
    numbers?: NumbersCreateNestedManyWithoutGuildInput
    strikes?: StrikesCreateNestedManyWithoutGuildConfigInput
  }

  export type GuildConfigsUncheckedCreateInput = {
    id: string
    whitelisted?: boolean
    locale?: string
    numbers?: NumbersUncheckedCreateNestedManyWithoutGuildInput
    strikes?: StrikesUncheckedCreateNestedManyWithoutGuildConfigInput
  }

  export type GuildConfigsUpdateInput = {
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    locale?: StringFieldUpdateOperationsInput | string
    numbers?: NumbersUpdateManyWithoutGuildNestedInput
    strikes?: StrikesUpdateManyWithoutGuildConfigNestedInput
  }

  export type GuildConfigsUncheckedUpdateInput = {
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    locale?: StringFieldUpdateOperationsInput | string
    numbers?: NumbersUncheckedUpdateManyWithoutGuildNestedInput
    strikes?: StrikesUncheckedUpdateManyWithoutGuildConfigNestedInput
  }

  export type GuildConfigsCreateManyInput = {
    id: string
    whitelisted?: boolean
    locale?: string
  }

  export type GuildConfigsUpdateManyMutationInput = {
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    locale?: StringFieldUpdateOperationsInput | string
  }

  export type GuildConfigsUncheckedUpdateManyInput = {
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    locale?: StringFieldUpdateOperationsInput | string
  }

  export type AccountsCreateInput = {
    id: string
    balance?: number
    dailyClaimedAt?: Date | string | null
    vipMonthsRemaining?: number
    strikes?: StrikesCreateNestedManyWithoutAccountInput
    Votes?: VotesCreateNestedOneWithoutAccountInput
  }

  export type AccountsUncheckedCreateInput = {
    id: string
    balance?: number
    dailyClaimedAt?: Date | string | null
    vipMonthsRemaining?: number
    strikes?: StrikesUncheckedCreateNestedManyWithoutAccountInput
    Votes?: VotesUncheckedCreateNestedOneWithoutAccountInput
  }

  export type AccountsUpdateInput = {
    balance?: FloatFieldUpdateOperationsInput | number
    dailyClaimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vipMonthsRemaining?: IntFieldUpdateOperationsInput | number
    strikes?: StrikesUpdateManyWithoutAccountNestedInput
    Votes?: VotesUpdateOneWithoutAccountNestedInput
  }

  export type AccountsUncheckedUpdateInput = {
    balance?: FloatFieldUpdateOperationsInput | number
    dailyClaimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vipMonthsRemaining?: IntFieldUpdateOperationsInput | number
    strikes?: StrikesUncheckedUpdateManyWithoutAccountNestedInput
    Votes?: VotesUncheckedUpdateOneWithoutAccountNestedInput
  }

  export type AccountsCreateManyInput = {
    id: string
    balance?: number
    dailyClaimedAt?: Date | string | null
    vipMonthsRemaining?: number
  }

  export type AccountsUpdateManyMutationInput = {
    balance?: FloatFieldUpdateOperationsInput | number
    dailyClaimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vipMonthsRemaining?: IntFieldUpdateOperationsInput | number
  }

  export type AccountsUncheckedUpdateManyInput = {
    balance?: FloatFieldUpdateOperationsInput | number
    dailyClaimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vipMonthsRemaining?: IntFieldUpdateOperationsInput | number
  }

  export type StrikesCreateInput = {
    id: string
    reason: string
    type: $Enums.StrikeOffenderType
    created: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    account: AccountsCreateNestedOneWithoutStrikesInput
    guildConfig: GuildConfigsCreateNestedOneWithoutStrikesInput
  }

  export type StrikesUncheckedCreateInput = {
    id: string
    offender: string
    reason: string
    type: $Enums.StrikeOffenderType
    created: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesUpdateInput = {
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    account?: AccountsUpdateOneRequiredWithoutStrikesNestedInput
    guildConfig?: GuildConfigsUpdateOneRequiredWithoutStrikesNestedInput
  }

  export type StrikesUncheckedUpdateInput = {
    offender?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesCreateManyInput = {
    id: string
    offender: string
    reason: string
    type: $Enums.StrikeOffenderType
    created: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesUpdateManyMutationInput = {
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesUncheckedUpdateManyInput = {
    offender?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
  }

  export type BlacklistCreateInput = {
    id: string
    reason?: string | null
  }

  export type BlacklistUncheckedCreateInput = {
    id: string
    reason?: string | null
  }

  export type BlacklistUpdateInput = {
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlacklistUncheckedUpdateInput = {
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlacklistCreateManyInput = {
    id: string
    reason?: string | null
  }

  export type BlacklistUpdateManyMutationInput = {
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlacklistUncheckedUpdateManyInput = {
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhonebookCreateInput = {
    description: string
    numberDoc: NumbersCreateNestedOneWithoutPhonebookInput
  }

  export type PhonebookUncheckedCreateInput = {
    number: string
    description: string
  }

  export type PhonebookUpdateInput = {
    description?: StringFieldUpdateOperationsInput | string
    numberDoc?: NumbersUpdateOneRequiredWithoutPhonebookNestedInput
  }

  export type PhonebookUncheckedUpdateInput = {
    description?: StringFieldUpdateOperationsInput | string
  }

  export type PhonebookCreateManyInput = {
    number: string
    description: string
  }

  export type PhonebookUpdateManyMutationInput = {
    description?: StringFieldUpdateOperationsInput | string
  }

  export type PhonebookUncheckedUpdateManyInput = {
    description?: StringFieldUpdateOperationsInput | string
  }

  export type PromoteCreateInput = {
    number: string
    renderableNumber: string
    lastPromoMsgID?: string | null
  }

  export type PromoteUncheckedCreateInput = {
    number: string
    renderableNumber: string
    lastPromoMsgID?: string | null
  }

  export type PromoteUpdateInput = {
    renderableNumber?: StringFieldUpdateOperationsInput | string
    lastPromoMsgID?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PromoteUncheckedUpdateInput = {
    renderableNumber?: StringFieldUpdateOperationsInput | string
    lastPromoMsgID?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PromoteCreateManyInput = {
    number: string
    renderableNumber: string
    lastPromoMsgID?: string | null
  }

  export type PromoteUpdateManyMutationInput = {
    renderableNumber?: StringFieldUpdateOperationsInput | string
    lastPromoMsgID?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PromoteUncheckedUpdateManyInput = {
    renderableNumber?: StringFieldUpdateOperationsInput | string
    lastPromoMsgID?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VotesCreateInput = {
    count?: number
    account: AccountsCreateNestedOneWithoutVotesInput
  }

  export type VotesUncheckedCreateInput = {
    userID: string
    count?: number
  }

  export type VotesUpdateInput = {
    count?: IntFieldUpdateOperationsInput | number
    account?: AccountsUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VotesUncheckedUpdateInput = {
    count?: IntFieldUpdateOperationsInput | number
  }

  export type VotesCreateManyInput = {
    userID: string
    count?: number
  }

  export type VotesUpdateManyMutationInput = {
    count?: IntFieldUpdateOperationsInput | number
  }

  export type VotesUncheckedUpdateManyInput = {
    count?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MailboxMessageCompositeListFilter = {
    equals?: mailboxMessageObjectEqualityInput[]
    every?: mailboxMessageWhereInput
    some?: mailboxMessageWhereInput
    none?: mailboxMessageWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type mailboxMessageObjectEqualityInput = {
    id: string
    from: string
    message: string
    sent: atAndByObjectEqualityInput
  }

  export type NumbersNullableScalarRelationFilter = {
    is?: NumbersWhereInput | null
    isNot?: NumbersWhereInput | null
  }

  export type mailboxMessageOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type MailboxCountOrderByAggregateInput = {
    number?: SortOrder
    autoreply?: SortOrder
    receiving?: SortOrder
  }

  export type MailboxMaxOrderByAggregateInput = {
    number?: SortOrder
    autoreply?: SortOrder
    receiving?: SortOrder
  }

  export type MailboxMinOrderByAggregateInput = {
    number?: SortOrder
    autoreply?: SortOrder
    receiving?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ContactCompositeListFilter = {
    equals?: ContactObjectEqualityInput[]
    every?: ContactWhereInput
    some?: ContactWhereInput
    none?: ContactWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type ContactObjectEqualityInput = {
    name: string
    number: string
    description: string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NumberVIPNullableCompositeFilter = {
    equals?: numberVIPObjectEqualityInput | null
    is?: numberVIPWhereInput | null
    isNot?: numberVIPWhereInput | null
    isSet?: boolean
  }

  export type numberVIPObjectEqualityInput = {
    expiry: Date | string
    hidden: boolean
    name: string
  }

  export type MailboxNullableScalarRelationFilter = {
    is?: MailboxWhereInput | null
    isNot?: MailboxWhereInput | null
  }

  export type ActiveCallsListRelationFilter = {
    every?: ActiveCallsWhereInput
    some?: ActiveCallsWhereInput
    none?: ActiveCallsWhereInput
  }

  export type GuildConfigsNullableScalarRelationFilter = {
    is?: GuildConfigsWhereInput | null
    isNot?: GuildConfigsWhereInput | null
  }

  export type PhonebookNullableScalarRelationFilter = {
    is?: PhonebookWhereInput | null
    isNot?: PhonebookWhereInput | null
  }

  export type ContactOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type numberVIPOrderByInput = {
    expiry?: SortOrder
    hidden?: SortOrder
    name?: SortOrder
  }

  export type ActiveCallsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NumbersCountOrderByAggregateInput = {
    number?: SortOrder
    channelID?: SortOrder
    guildID?: SortOrder
    userID?: SortOrder
    blocked?: SortOrder
    expiry?: SortOrder
    mentions?: SortOrder
    waiting?: SortOrder
    createdAt?: SortOrder
    fka?: SortOrder
  }

  export type NumbersMaxOrderByAggregateInput = {
    number?: SortOrder
    channelID?: SortOrder
    guildID?: SortOrder
    userID?: SortOrder
    expiry?: SortOrder
    waiting?: SortOrder
    createdAt?: SortOrder
  }

  export type NumbersMinOrderByAggregateInput = {
    number?: SortOrder
    channelID?: SortOrder
    guildID?: SortOrder
    userID?: SortOrder
    expiry?: SortOrder
    waiting?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CallMessagesCountOrderByAggregateInput = {
    id?: SortOrder
    callID?: SortOrder
    forwardedMessageID?: SortOrder
    originalMessageID?: SortOrder
    sentAt?: SortOrder
    sender?: SortOrder
  }

  export type CallMessagesMaxOrderByAggregateInput = {
    id?: SortOrder
    callID?: SortOrder
    forwardedMessageID?: SortOrder
    originalMessageID?: SortOrder
    sentAt?: SortOrder
    sender?: SortOrder
  }

  export type CallMessagesMinOrderByAggregateInput = {
    id?: SortOrder
    callID?: SortOrder
    forwardedMessageID?: SortOrder
    originalMessageID?: SortOrder
    sentAt?: SortOrder
    sender?: SortOrder
  }

  export type AtAndByNullableCompositeFilter = {
    equals?: atAndByObjectEqualityInput | null
    is?: atAndByWhereInput | null
    isNot?: atAndByWhereInput | null
    isSet?: boolean
  }

  export type atAndByObjectEqualityInput = {
    at: Date | string
    by: string
  }

  export type AtAndByCompositeFilter = {
    equals?: atAndByObjectEqualityInput
    is?: atAndByWhereInput
    isNot?: atAndByWhereInput
  }

  export type OnHoldCompositeFilter = {
    equals?: onHoldObjectEqualityInput
    is?: onHoldWhereInput
    isNot?: onHoldWhereInput
  }

  export type onHoldObjectEqualityInput = {
    onHold: boolean
    holdingSide?: string | null
  }

  export type atAndByOrderByInput = {
    at?: SortOrder
    by?: SortOrder
  }

  export type onHoldOrderByInput = {
    onHold?: SortOrder
    holdingSide?: SortOrder
  }

  export type ActiveCallsCountOrderByAggregateInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    randomCall?: SortOrder
  }

  export type ActiveCallsMaxOrderByAggregateInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    randomCall?: SortOrder
  }

  export type ActiveCallsMinOrderByAggregateInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    randomCall?: SortOrder
  }

  export type ArchivedCallsCountOrderByAggregateInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    randomCall?: SortOrder
  }

  export type ArchivedCallsMaxOrderByAggregateInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    randomCall?: SortOrder
  }

  export type ArchivedCallsMinOrderByAggregateInput = {
    id?: SortOrder
    toNum?: SortOrder
    fromNum?: SortOrder
    randomCall?: SortOrder
  }

  export type NumbersListRelationFilter = {
    every?: NumbersWhereInput
    some?: NumbersWhereInput
    none?: NumbersWhereInput
  }

  export type StrikesListRelationFilter = {
    every?: StrikesWhereInput
    some?: StrikesWhereInput
    none?: StrikesWhereInput
  }

  export type NumbersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StrikesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GuildConfigsCountOrderByAggregateInput = {
    id?: SortOrder
    whitelisted?: SortOrder
    locale?: SortOrder
  }

  export type GuildConfigsMaxOrderByAggregateInput = {
    id?: SortOrder
    whitelisted?: SortOrder
    locale?: SortOrder
  }

  export type GuildConfigsMinOrderByAggregateInput = {
    id?: SortOrder
    whitelisted?: SortOrder
    locale?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type VotesNullableScalarRelationFilter = {
    is?: VotesWhereInput | null
    isNot?: VotesWhereInput | null
  }

  export type AccountsCountOrderByAggregateInput = {
    id?: SortOrder
    balance?: SortOrder
    dailyClaimedAt?: SortOrder
    vipMonthsRemaining?: SortOrder
  }

  export type AccountsAvgOrderByAggregateInput = {
    balance?: SortOrder
    vipMonthsRemaining?: SortOrder
  }

  export type AccountsMaxOrderByAggregateInput = {
    id?: SortOrder
    balance?: SortOrder
    dailyClaimedAt?: SortOrder
    vipMonthsRemaining?: SortOrder
  }

  export type AccountsMinOrderByAggregateInput = {
    id?: SortOrder
    balance?: SortOrder
    dailyClaimedAt?: SortOrder
    vipMonthsRemaining?: SortOrder
  }

  export type AccountsSumOrderByAggregateInput = {
    balance?: SortOrder
    vipMonthsRemaining?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStrikeOffenderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StrikeOffenderType | EnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StrikeOffenderType[] | ListEnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StrikeOffenderType[] | ListEnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStrikeOffenderTypeFilter<$PrismaModel> | $Enums.StrikeOffenderType
  }

  export type AccountsScalarRelationFilter = {
    is?: AccountsWhereInput
    isNot?: AccountsWhereInput
  }

  export type GuildConfigsScalarRelationFilter = {
    is?: GuildConfigsWhereInput
    isNot?: GuildConfigsWhereInput
  }

  export type StrikesCountOrderByAggregateInput = {
    id?: SortOrder
    offender?: SortOrder
    reason?: SortOrder
    type?: SortOrder
  }

  export type StrikesMaxOrderByAggregateInput = {
    id?: SortOrder
    offender?: SortOrder
    reason?: SortOrder
    type?: SortOrder
  }

  export type StrikesMinOrderByAggregateInput = {
    id?: SortOrder
    offender?: SortOrder
    reason?: SortOrder
    type?: SortOrder
  }

  export type EnumStrikeOffenderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StrikeOffenderType | EnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StrikeOffenderType[] | ListEnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StrikeOffenderType[] | ListEnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStrikeOffenderTypeWithAggregatesFilter<$PrismaModel> | $Enums.StrikeOffenderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStrikeOffenderTypeFilter<$PrismaModel>
    _max?: NestedEnumStrikeOffenderTypeFilter<$PrismaModel>
  }

  export type BlacklistCountOrderByAggregateInput = {
    id?: SortOrder
    reason?: SortOrder
  }

  export type BlacklistMaxOrderByAggregateInput = {
    id?: SortOrder
    reason?: SortOrder
  }

  export type BlacklistMinOrderByAggregateInput = {
    id?: SortOrder
    reason?: SortOrder
  }

  export type NumbersScalarRelationFilter = {
    is?: NumbersWhereInput
    isNot?: NumbersWhereInput
  }

  export type PhonebookCountOrderByAggregateInput = {
    number?: SortOrder
    description?: SortOrder
  }

  export type PhonebookMaxOrderByAggregateInput = {
    number?: SortOrder
    description?: SortOrder
  }

  export type PhonebookMinOrderByAggregateInput = {
    number?: SortOrder
    description?: SortOrder
  }

  export type PromoteCountOrderByAggregateInput = {
    number?: SortOrder
    renderableNumber?: SortOrder
    lastPromoMsgID?: SortOrder
  }

  export type PromoteMaxOrderByAggregateInput = {
    number?: SortOrder
    renderableNumber?: SortOrder
    lastPromoMsgID?: SortOrder
  }

  export type PromoteMinOrderByAggregateInput = {
    number?: SortOrder
    renderableNumber?: SortOrder
    lastPromoMsgID?: SortOrder
  }

  export type VotesCountOrderByAggregateInput = {
    userID?: SortOrder
    count?: SortOrder
  }

  export type VotesAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type VotesMaxOrderByAggregateInput = {
    userID?: SortOrder
    count?: SortOrder
  }

  export type VotesMinOrderByAggregateInput = {
    userID?: SortOrder
    count?: SortOrder
  }

  export type VotesSumOrderByAggregateInput = {
    count?: SortOrder
  }

  export type mailboxMessageListCreateEnvelopeInput = {
    set?: mailboxMessageCreateInput | mailboxMessageCreateInput[]
  }

  export type mailboxMessageCreateInput = {
    id: string
    from: string
    message: string
    sent: atAndByCreateInput
  }

  export type NumbersCreateNestedOneWithoutMailboxInput = {
    create?: XOR<NumbersCreateWithoutMailboxInput, NumbersUncheckedCreateWithoutMailboxInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutMailboxInput
    connect?: NumbersWhereUniqueInput
  }

  export type NumbersUncheckedCreateNestedOneWithoutMailboxInput = {
    create?: XOR<NumbersCreateWithoutMailboxInput, NumbersUncheckedCreateWithoutMailboxInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutMailboxInput
    connect?: NumbersWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type mailboxMessageListUpdateEnvelopeInput = {
    set?: mailboxMessageCreateInput | mailboxMessageCreateInput[]
    push?: mailboxMessageCreateInput | mailboxMessageCreateInput[]
    updateMany?: mailboxMessageUpdateManyInput
    deleteMany?: mailboxMessageDeleteManyInput
  }

  export type NumbersUpdateOneWithoutMailboxNestedInput = {
    create?: XOR<NumbersCreateWithoutMailboxInput, NumbersUncheckedCreateWithoutMailboxInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutMailboxInput
    upsert?: NumbersUpsertWithoutMailboxInput
    disconnect?: NumbersWhereInput | boolean
    delete?: NumbersWhereInput | boolean
    connect?: NumbersWhereUniqueInput
    update?: XOR<XOR<NumbersUpdateToOneWithWhereWithoutMailboxInput, NumbersUpdateWithoutMailboxInput>, NumbersUncheckedUpdateWithoutMailboxInput>
  }

  export type NumbersUncheckedUpdateOneWithoutMailboxNestedInput = {
    create?: XOR<NumbersCreateWithoutMailboxInput, NumbersUncheckedCreateWithoutMailboxInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutMailboxInput
    upsert?: NumbersUpsertWithoutMailboxInput
    disconnect?: NumbersWhereInput | boolean
    delete?: NumbersWhereInput | boolean
    connect?: NumbersWhereUniqueInput
    update?: XOR<XOR<NumbersUpdateToOneWithWhereWithoutMailboxInput, NumbersUpdateWithoutMailboxInput>, NumbersUncheckedUpdateWithoutMailboxInput>
  }

  export type NumbersCreateblockedInput = {
    set: string[]
  }

  export type ContactListCreateEnvelopeInput = {
    set?: ContactCreateInput | ContactCreateInput[]
  }

  export type ContactCreateInput = {
    name: string
    number: string
    description: string
  }

  export type NumbersCreatementionsInput = {
    set: string[]
  }

  export type numberVIPNullableCreateEnvelopeInput = {
    set?: numberVIPCreateInput | null
  }

  export type numberVIPCreateInput = {
    expiry?: Date | string
    hidden?: boolean
    name?: string
  }

  export type NumbersCreatefkaInput = {
    set: string[]
  }

  export type MailboxCreateNestedOneWithoutNumberDocInput = {
    create?: XOR<MailboxCreateWithoutNumberDocInput, MailboxUncheckedCreateWithoutNumberDocInput>
    connectOrCreate?: MailboxCreateOrConnectWithoutNumberDocInput
    connect?: MailboxWhereUniqueInput
  }

  export type ActiveCallsCreateNestedManyWithoutToInput = {
    create?: XOR<ActiveCallsCreateWithoutToInput, ActiveCallsUncheckedCreateWithoutToInput> | ActiveCallsCreateWithoutToInput[] | ActiveCallsUncheckedCreateWithoutToInput[]
    connectOrCreate?: ActiveCallsCreateOrConnectWithoutToInput | ActiveCallsCreateOrConnectWithoutToInput[]
    createMany?: ActiveCallsCreateManyToInputEnvelope
    connect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
  }

  export type ActiveCallsCreateNestedManyWithoutFromInput = {
    create?: XOR<ActiveCallsCreateWithoutFromInput, ActiveCallsUncheckedCreateWithoutFromInput> | ActiveCallsCreateWithoutFromInput[] | ActiveCallsUncheckedCreateWithoutFromInput[]
    connectOrCreate?: ActiveCallsCreateOrConnectWithoutFromInput | ActiveCallsCreateOrConnectWithoutFromInput[]
    createMany?: ActiveCallsCreateManyFromInputEnvelope
    connect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
  }

  export type GuildConfigsCreateNestedOneWithoutNumbersInput = {
    create?: XOR<GuildConfigsCreateWithoutNumbersInput, GuildConfigsUncheckedCreateWithoutNumbersInput>
    connectOrCreate?: GuildConfigsCreateOrConnectWithoutNumbersInput
    connect?: GuildConfigsWhereUniqueInput
  }

  export type PhonebookCreateNestedOneWithoutNumberDocInput = {
    create?: XOR<PhonebookCreateWithoutNumberDocInput, PhonebookUncheckedCreateWithoutNumberDocInput>
    connectOrCreate?: PhonebookCreateOrConnectWithoutNumberDocInput
    connect?: PhonebookWhereUniqueInput
  }

  export type ActiveCallsUncheckedCreateNestedManyWithoutToInput = {
    create?: XOR<ActiveCallsCreateWithoutToInput, ActiveCallsUncheckedCreateWithoutToInput> | ActiveCallsCreateWithoutToInput[] | ActiveCallsUncheckedCreateWithoutToInput[]
    connectOrCreate?: ActiveCallsCreateOrConnectWithoutToInput | ActiveCallsCreateOrConnectWithoutToInput[]
    createMany?: ActiveCallsCreateManyToInputEnvelope
    connect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
  }

  export type ActiveCallsUncheckedCreateNestedManyWithoutFromInput = {
    create?: XOR<ActiveCallsCreateWithoutFromInput, ActiveCallsUncheckedCreateWithoutFromInput> | ActiveCallsCreateWithoutFromInput[] | ActiveCallsUncheckedCreateWithoutFromInput[]
    connectOrCreate?: ActiveCallsCreateOrConnectWithoutFromInput | ActiveCallsCreateOrConnectWithoutFromInput[]
    createMany?: ActiveCallsCreateManyFromInputEnvelope
    connect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
  }

  export type PhonebookUncheckedCreateNestedOneWithoutNumberDocInput = {
    create?: XOR<PhonebookCreateWithoutNumberDocInput, PhonebookUncheckedCreateWithoutNumberDocInput>
    connectOrCreate?: PhonebookCreateOrConnectWithoutNumberDocInput
    connect?: PhonebookWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type NumbersUpdateblockedInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ContactListUpdateEnvelopeInput = {
    set?: ContactCreateInput | ContactCreateInput[]
    push?: ContactCreateInput | ContactCreateInput[]
    updateMany?: ContactUpdateManyInput
    deleteMany?: ContactDeleteManyInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NumbersUpdatementionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type numberVIPNullableUpdateEnvelopeInput = {
    set?: numberVIPCreateInput | null
    upsert?: numberVIPUpsertInput
    unset?: boolean
  }

  export type NumbersUpdatefkaInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MailboxUpdateOneWithoutNumberDocNestedInput = {
    create?: XOR<MailboxCreateWithoutNumberDocInput, MailboxUncheckedCreateWithoutNumberDocInput>
    connectOrCreate?: MailboxCreateOrConnectWithoutNumberDocInput
    upsert?: MailboxUpsertWithoutNumberDocInput
    disconnect?: boolean
    delete?: MailboxWhereInput | boolean
    connect?: MailboxWhereUniqueInput
    update?: XOR<XOR<MailboxUpdateToOneWithWhereWithoutNumberDocInput, MailboxUpdateWithoutNumberDocInput>, MailboxUncheckedUpdateWithoutNumberDocInput>
  }

  export type ActiveCallsUpdateManyWithoutToNestedInput = {
    create?: XOR<ActiveCallsCreateWithoutToInput, ActiveCallsUncheckedCreateWithoutToInput> | ActiveCallsCreateWithoutToInput[] | ActiveCallsUncheckedCreateWithoutToInput[]
    connectOrCreate?: ActiveCallsCreateOrConnectWithoutToInput | ActiveCallsCreateOrConnectWithoutToInput[]
    upsert?: ActiveCallsUpsertWithWhereUniqueWithoutToInput | ActiveCallsUpsertWithWhereUniqueWithoutToInput[]
    createMany?: ActiveCallsCreateManyToInputEnvelope
    set?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    disconnect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    delete?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    connect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    update?: ActiveCallsUpdateWithWhereUniqueWithoutToInput | ActiveCallsUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: ActiveCallsUpdateManyWithWhereWithoutToInput | ActiveCallsUpdateManyWithWhereWithoutToInput[]
    deleteMany?: ActiveCallsScalarWhereInput | ActiveCallsScalarWhereInput[]
  }

  export type ActiveCallsUpdateManyWithoutFromNestedInput = {
    create?: XOR<ActiveCallsCreateWithoutFromInput, ActiveCallsUncheckedCreateWithoutFromInput> | ActiveCallsCreateWithoutFromInput[] | ActiveCallsUncheckedCreateWithoutFromInput[]
    connectOrCreate?: ActiveCallsCreateOrConnectWithoutFromInput | ActiveCallsCreateOrConnectWithoutFromInput[]
    upsert?: ActiveCallsUpsertWithWhereUniqueWithoutFromInput | ActiveCallsUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: ActiveCallsCreateManyFromInputEnvelope
    set?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    disconnect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    delete?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    connect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    update?: ActiveCallsUpdateWithWhereUniqueWithoutFromInput | ActiveCallsUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: ActiveCallsUpdateManyWithWhereWithoutFromInput | ActiveCallsUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: ActiveCallsScalarWhereInput | ActiveCallsScalarWhereInput[]
  }

  export type GuildConfigsUpdateOneWithoutNumbersNestedInput = {
    create?: XOR<GuildConfigsCreateWithoutNumbersInput, GuildConfigsUncheckedCreateWithoutNumbersInput>
    connectOrCreate?: GuildConfigsCreateOrConnectWithoutNumbersInput
    upsert?: GuildConfigsUpsertWithoutNumbersInput
    disconnect?: boolean
    delete?: GuildConfigsWhereInput | boolean
    connect?: GuildConfigsWhereUniqueInput
    update?: XOR<XOR<GuildConfigsUpdateToOneWithWhereWithoutNumbersInput, GuildConfigsUpdateWithoutNumbersInput>, GuildConfigsUncheckedUpdateWithoutNumbersInput>
  }

  export type PhonebookUpdateOneWithoutNumberDocNestedInput = {
    create?: XOR<PhonebookCreateWithoutNumberDocInput, PhonebookUncheckedCreateWithoutNumberDocInput>
    connectOrCreate?: PhonebookCreateOrConnectWithoutNumberDocInput
    upsert?: PhonebookUpsertWithoutNumberDocInput
    disconnect?: PhonebookWhereInput | boolean
    delete?: PhonebookWhereInput | boolean
    connect?: PhonebookWhereUniqueInput
    update?: XOR<XOR<PhonebookUpdateToOneWithWhereWithoutNumberDocInput, PhonebookUpdateWithoutNumberDocInput>, PhonebookUncheckedUpdateWithoutNumberDocInput>
  }

  export type ActiveCallsUncheckedUpdateManyWithoutToNestedInput = {
    create?: XOR<ActiveCallsCreateWithoutToInput, ActiveCallsUncheckedCreateWithoutToInput> | ActiveCallsCreateWithoutToInput[] | ActiveCallsUncheckedCreateWithoutToInput[]
    connectOrCreate?: ActiveCallsCreateOrConnectWithoutToInput | ActiveCallsCreateOrConnectWithoutToInput[]
    upsert?: ActiveCallsUpsertWithWhereUniqueWithoutToInput | ActiveCallsUpsertWithWhereUniqueWithoutToInput[]
    createMany?: ActiveCallsCreateManyToInputEnvelope
    set?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    disconnect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    delete?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    connect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    update?: ActiveCallsUpdateWithWhereUniqueWithoutToInput | ActiveCallsUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: ActiveCallsUpdateManyWithWhereWithoutToInput | ActiveCallsUpdateManyWithWhereWithoutToInput[]
    deleteMany?: ActiveCallsScalarWhereInput | ActiveCallsScalarWhereInput[]
  }

  export type ActiveCallsUncheckedUpdateManyWithoutFromNestedInput = {
    create?: XOR<ActiveCallsCreateWithoutFromInput, ActiveCallsUncheckedCreateWithoutFromInput> | ActiveCallsCreateWithoutFromInput[] | ActiveCallsUncheckedCreateWithoutFromInput[]
    connectOrCreate?: ActiveCallsCreateOrConnectWithoutFromInput | ActiveCallsCreateOrConnectWithoutFromInput[]
    upsert?: ActiveCallsUpsertWithWhereUniqueWithoutFromInput | ActiveCallsUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: ActiveCallsCreateManyFromInputEnvelope
    set?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    disconnect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    delete?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    connect?: ActiveCallsWhereUniqueInput | ActiveCallsWhereUniqueInput[]
    update?: ActiveCallsUpdateWithWhereUniqueWithoutFromInput | ActiveCallsUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: ActiveCallsUpdateManyWithWhereWithoutFromInput | ActiveCallsUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: ActiveCallsScalarWhereInput | ActiveCallsScalarWhereInput[]
  }

  export type PhonebookUncheckedUpdateOneWithoutNumberDocNestedInput = {
    create?: XOR<PhonebookCreateWithoutNumberDocInput, PhonebookUncheckedCreateWithoutNumberDocInput>
    connectOrCreate?: PhonebookCreateOrConnectWithoutNumberDocInput
    upsert?: PhonebookUpsertWithoutNumberDocInput
    disconnect?: PhonebookWhereInput | boolean
    delete?: PhonebookWhereInput | boolean
    connect?: PhonebookWhereUniqueInput
    update?: XOR<XOR<PhonebookUpdateToOneWithWhereWithoutNumberDocInput, PhonebookUpdateWithoutNumberDocInput>, PhonebookUncheckedUpdateWithoutNumberDocInput>
  }

  export type atAndByNullableCreateEnvelopeInput = {
    set?: atAndByCreateInput | null
  }

  export type atAndByCreateInput = {
    at?: Date | string
    by: string
  }

  export type atAndByCreateEnvelopeInput = {
    set?: atAndByCreateInput
  }

  export type onHoldCreateEnvelopeInput = {
    set?: onHoldCreateInput
  }

  export type onHoldCreateInput = {
    onHold: boolean
    holdingSide?: string | null
  }

  export type NumbersCreateNestedOneWithoutOutgoingCallsInput = {
    create?: XOR<NumbersCreateWithoutOutgoingCallsInput, NumbersUncheckedCreateWithoutOutgoingCallsInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutOutgoingCallsInput
    connect?: NumbersWhereUniqueInput
  }

  export type NumbersCreateNestedOneWithoutIncomingCallsInput = {
    create?: XOR<NumbersCreateWithoutIncomingCallsInput, NumbersUncheckedCreateWithoutIncomingCallsInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutIncomingCallsInput
    connect?: NumbersWhereUniqueInput
  }

  export type atAndByNullableUpdateEnvelopeInput = {
    set?: atAndByCreateInput | null
    upsert?: atAndByUpsertInput
    unset?: boolean
  }

  export type atAndByUpdateEnvelopeInput = {
    set?: atAndByCreateInput
    update?: atAndByUpdateInput
  }

  export type onHoldUpdateEnvelopeInput = {
    set?: onHoldCreateInput
    update?: onHoldUpdateInput
  }

  export type NumbersUpdateOneWithoutOutgoingCallsNestedInput = {
    create?: XOR<NumbersCreateWithoutOutgoingCallsInput, NumbersUncheckedCreateWithoutOutgoingCallsInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutOutgoingCallsInput
    upsert?: NumbersUpsertWithoutOutgoingCallsInput
    disconnect?: boolean
    delete?: NumbersWhereInput | boolean
    connect?: NumbersWhereUniqueInput
    update?: XOR<XOR<NumbersUpdateToOneWithWhereWithoutOutgoingCallsInput, NumbersUpdateWithoutOutgoingCallsInput>, NumbersUncheckedUpdateWithoutOutgoingCallsInput>
  }

  export type NumbersUpdateOneWithoutIncomingCallsNestedInput = {
    create?: XOR<NumbersCreateWithoutIncomingCallsInput, NumbersUncheckedCreateWithoutIncomingCallsInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutIncomingCallsInput
    upsert?: NumbersUpsertWithoutIncomingCallsInput
    disconnect?: boolean
    delete?: NumbersWhereInput | boolean
    connect?: NumbersWhereUniqueInput
    update?: XOR<XOR<NumbersUpdateToOneWithWhereWithoutIncomingCallsInput, NumbersUpdateWithoutIncomingCallsInput>, NumbersUncheckedUpdateWithoutIncomingCallsInput>
  }

  export type NumbersCreateNestedManyWithoutGuildInput = {
    create?: XOR<NumbersCreateWithoutGuildInput, NumbersUncheckedCreateWithoutGuildInput> | NumbersCreateWithoutGuildInput[] | NumbersUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: NumbersCreateOrConnectWithoutGuildInput | NumbersCreateOrConnectWithoutGuildInput[]
    createMany?: NumbersCreateManyGuildInputEnvelope
    connect?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
  }

  export type StrikesCreateNestedManyWithoutGuildConfigInput = {
    create?: XOR<StrikesCreateWithoutGuildConfigInput, StrikesUncheckedCreateWithoutGuildConfigInput> | StrikesCreateWithoutGuildConfigInput[] | StrikesUncheckedCreateWithoutGuildConfigInput[]
    connectOrCreate?: StrikesCreateOrConnectWithoutGuildConfigInput | StrikesCreateOrConnectWithoutGuildConfigInput[]
    createMany?: StrikesCreateManyGuildConfigInputEnvelope
    connect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
  }

  export type NumbersUncheckedCreateNestedManyWithoutGuildInput = {
    create?: XOR<NumbersCreateWithoutGuildInput, NumbersUncheckedCreateWithoutGuildInput> | NumbersCreateWithoutGuildInput[] | NumbersUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: NumbersCreateOrConnectWithoutGuildInput | NumbersCreateOrConnectWithoutGuildInput[]
    createMany?: NumbersCreateManyGuildInputEnvelope
    connect?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
  }

  export type StrikesUncheckedCreateNestedManyWithoutGuildConfigInput = {
    create?: XOR<StrikesCreateWithoutGuildConfigInput, StrikesUncheckedCreateWithoutGuildConfigInput> | StrikesCreateWithoutGuildConfigInput[] | StrikesUncheckedCreateWithoutGuildConfigInput[]
    connectOrCreate?: StrikesCreateOrConnectWithoutGuildConfigInput | StrikesCreateOrConnectWithoutGuildConfigInput[]
    createMany?: StrikesCreateManyGuildConfigInputEnvelope
    connect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
  }

  export type NumbersUpdateManyWithoutGuildNestedInput = {
    create?: XOR<NumbersCreateWithoutGuildInput, NumbersUncheckedCreateWithoutGuildInput> | NumbersCreateWithoutGuildInput[] | NumbersUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: NumbersCreateOrConnectWithoutGuildInput | NumbersCreateOrConnectWithoutGuildInput[]
    upsert?: NumbersUpsertWithWhereUniqueWithoutGuildInput | NumbersUpsertWithWhereUniqueWithoutGuildInput[]
    createMany?: NumbersCreateManyGuildInputEnvelope
    set?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
    disconnect?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
    delete?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
    connect?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
    update?: NumbersUpdateWithWhereUniqueWithoutGuildInput | NumbersUpdateWithWhereUniqueWithoutGuildInput[]
    updateMany?: NumbersUpdateManyWithWhereWithoutGuildInput | NumbersUpdateManyWithWhereWithoutGuildInput[]
    deleteMany?: NumbersScalarWhereInput | NumbersScalarWhereInput[]
  }

  export type StrikesUpdateManyWithoutGuildConfigNestedInput = {
    create?: XOR<StrikesCreateWithoutGuildConfigInput, StrikesUncheckedCreateWithoutGuildConfigInput> | StrikesCreateWithoutGuildConfigInput[] | StrikesUncheckedCreateWithoutGuildConfigInput[]
    connectOrCreate?: StrikesCreateOrConnectWithoutGuildConfigInput | StrikesCreateOrConnectWithoutGuildConfigInput[]
    upsert?: StrikesUpsertWithWhereUniqueWithoutGuildConfigInput | StrikesUpsertWithWhereUniqueWithoutGuildConfigInput[]
    createMany?: StrikesCreateManyGuildConfigInputEnvelope
    set?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    disconnect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    delete?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    connect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    update?: StrikesUpdateWithWhereUniqueWithoutGuildConfigInput | StrikesUpdateWithWhereUniqueWithoutGuildConfigInput[]
    updateMany?: StrikesUpdateManyWithWhereWithoutGuildConfigInput | StrikesUpdateManyWithWhereWithoutGuildConfigInput[]
    deleteMany?: StrikesScalarWhereInput | StrikesScalarWhereInput[]
  }

  export type NumbersUncheckedUpdateManyWithoutGuildNestedInput = {
    create?: XOR<NumbersCreateWithoutGuildInput, NumbersUncheckedCreateWithoutGuildInput> | NumbersCreateWithoutGuildInput[] | NumbersUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: NumbersCreateOrConnectWithoutGuildInput | NumbersCreateOrConnectWithoutGuildInput[]
    upsert?: NumbersUpsertWithWhereUniqueWithoutGuildInput | NumbersUpsertWithWhereUniqueWithoutGuildInput[]
    createMany?: NumbersCreateManyGuildInputEnvelope
    set?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
    disconnect?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
    delete?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
    connect?: NumbersWhereUniqueInput | NumbersWhereUniqueInput[]
    update?: NumbersUpdateWithWhereUniqueWithoutGuildInput | NumbersUpdateWithWhereUniqueWithoutGuildInput[]
    updateMany?: NumbersUpdateManyWithWhereWithoutGuildInput | NumbersUpdateManyWithWhereWithoutGuildInput[]
    deleteMany?: NumbersScalarWhereInput | NumbersScalarWhereInput[]
  }

  export type StrikesUncheckedUpdateManyWithoutGuildConfigNestedInput = {
    create?: XOR<StrikesCreateWithoutGuildConfigInput, StrikesUncheckedCreateWithoutGuildConfigInput> | StrikesCreateWithoutGuildConfigInput[] | StrikesUncheckedCreateWithoutGuildConfigInput[]
    connectOrCreate?: StrikesCreateOrConnectWithoutGuildConfigInput | StrikesCreateOrConnectWithoutGuildConfigInput[]
    upsert?: StrikesUpsertWithWhereUniqueWithoutGuildConfigInput | StrikesUpsertWithWhereUniqueWithoutGuildConfigInput[]
    createMany?: StrikesCreateManyGuildConfigInputEnvelope
    set?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    disconnect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    delete?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    connect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    update?: StrikesUpdateWithWhereUniqueWithoutGuildConfigInput | StrikesUpdateWithWhereUniqueWithoutGuildConfigInput[]
    updateMany?: StrikesUpdateManyWithWhereWithoutGuildConfigInput | StrikesUpdateManyWithWhereWithoutGuildConfigInput[]
    deleteMany?: StrikesScalarWhereInput | StrikesScalarWhereInput[]
  }

  export type StrikesCreateNestedManyWithoutAccountInput = {
    create?: XOR<StrikesCreateWithoutAccountInput, StrikesUncheckedCreateWithoutAccountInput> | StrikesCreateWithoutAccountInput[] | StrikesUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: StrikesCreateOrConnectWithoutAccountInput | StrikesCreateOrConnectWithoutAccountInput[]
    createMany?: StrikesCreateManyAccountInputEnvelope
    connect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
  }

  export type VotesCreateNestedOneWithoutAccountInput = {
    create?: XOR<VotesCreateWithoutAccountInput, VotesUncheckedCreateWithoutAccountInput>
    connectOrCreate?: VotesCreateOrConnectWithoutAccountInput
    connect?: VotesWhereUniqueInput
  }

  export type StrikesUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<StrikesCreateWithoutAccountInput, StrikesUncheckedCreateWithoutAccountInput> | StrikesCreateWithoutAccountInput[] | StrikesUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: StrikesCreateOrConnectWithoutAccountInput | StrikesCreateOrConnectWithoutAccountInput[]
    createMany?: StrikesCreateManyAccountInputEnvelope
    connect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
  }

  export type VotesUncheckedCreateNestedOneWithoutAccountInput = {
    create?: XOR<VotesCreateWithoutAccountInput, VotesUncheckedCreateWithoutAccountInput>
    connectOrCreate?: VotesCreateOrConnectWithoutAccountInput
    connect?: VotesWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StrikesUpdateManyWithoutAccountNestedInput = {
    create?: XOR<StrikesCreateWithoutAccountInput, StrikesUncheckedCreateWithoutAccountInput> | StrikesCreateWithoutAccountInput[] | StrikesUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: StrikesCreateOrConnectWithoutAccountInput | StrikesCreateOrConnectWithoutAccountInput[]
    upsert?: StrikesUpsertWithWhereUniqueWithoutAccountInput | StrikesUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: StrikesCreateManyAccountInputEnvelope
    set?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    disconnect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    delete?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    connect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    update?: StrikesUpdateWithWhereUniqueWithoutAccountInput | StrikesUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: StrikesUpdateManyWithWhereWithoutAccountInput | StrikesUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: StrikesScalarWhereInput | StrikesScalarWhereInput[]
  }

  export type VotesUpdateOneWithoutAccountNestedInput = {
    create?: XOR<VotesCreateWithoutAccountInput, VotesUncheckedCreateWithoutAccountInput>
    connectOrCreate?: VotesCreateOrConnectWithoutAccountInput
    upsert?: VotesUpsertWithoutAccountInput
    disconnect?: VotesWhereInput | boolean
    delete?: VotesWhereInput | boolean
    connect?: VotesWhereUniqueInput
    update?: XOR<XOR<VotesUpdateToOneWithWhereWithoutAccountInput, VotesUpdateWithoutAccountInput>, VotesUncheckedUpdateWithoutAccountInput>
  }

  export type StrikesUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<StrikesCreateWithoutAccountInput, StrikesUncheckedCreateWithoutAccountInput> | StrikesCreateWithoutAccountInput[] | StrikesUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: StrikesCreateOrConnectWithoutAccountInput | StrikesCreateOrConnectWithoutAccountInput[]
    upsert?: StrikesUpsertWithWhereUniqueWithoutAccountInput | StrikesUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: StrikesCreateManyAccountInputEnvelope
    set?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    disconnect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    delete?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    connect?: StrikesWhereUniqueInput | StrikesWhereUniqueInput[]
    update?: StrikesUpdateWithWhereUniqueWithoutAccountInput | StrikesUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: StrikesUpdateManyWithWhereWithoutAccountInput | StrikesUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: StrikesScalarWhereInput | StrikesScalarWhereInput[]
  }

  export type VotesUncheckedUpdateOneWithoutAccountNestedInput = {
    create?: XOR<VotesCreateWithoutAccountInput, VotesUncheckedCreateWithoutAccountInput>
    connectOrCreate?: VotesCreateOrConnectWithoutAccountInput
    upsert?: VotesUpsertWithoutAccountInput
    disconnect?: VotesWhereInput | boolean
    delete?: VotesWhereInput | boolean
    connect?: VotesWhereUniqueInput
    update?: XOR<XOR<VotesUpdateToOneWithWhereWithoutAccountInput, VotesUpdateWithoutAccountInput>, VotesUncheckedUpdateWithoutAccountInput>
  }

  export type AccountsCreateNestedOneWithoutStrikesInput = {
    create?: XOR<AccountsCreateWithoutStrikesInput, AccountsUncheckedCreateWithoutStrikesInput>
    connectOrCreate?: AccountsCreateOrConnectWithoutStrikesInput
    connect?: AccountsWhereUniqueInput
  }

  export type GuildConfigsCreateNestedOneWithoutStrikesInput = {
    create?: XOR<GuildConfigsCreateWithoutStrikesInput, GuildConfigsUncheckedCreateWithoutStrikesInput>
    connectOrCreate?: GuildConfigsCreateOrConnectWithoutStrikesInput
    connect?: GuildConfigsWhereUniqueInput
  }

  export type EnumStrikeOffenderTypeFieldUpdateOperationsInput = {
    set?: $Enums.StrikeOffenderType
  }

  export type AccountsUpdateOneRequiredWithoutStrikesNestedInput = {
    create?: XOR<AccountsCreateWithoutStrikesInput, AccountsUncheckedCreateWithoutStrikesInput>
    connectOrCreate?: AccountsCreateOrConnectWithoutStrikesInput
    upsert?: AccountsUpsertWithoutStrikesInput
    connect?: AccountsWhereUniqueInput
    update?: XOR<XOR<AccountsUpdateToOneWithWhereWithoutStrikesInput, AccountsUpdateWithoutStrikesInput>, AccountsUncheckedUpdateWithoutStrikesInput>
  }

  export type GuildConfigsUpdateOneRequiredWithoutStrikesNestedInput = {
    create?: XOR<GuildConfigsCreateWithoutStrikesInput, GuildConfigsUncheckedCreateWithoutStrikesInput>
    connectOrCreate?: GuildConfigsCreateOrConnectWithoutStrikesInput
    upsert?: GuildConfigsUpsertWithoutStrikesInput
    connect?: GuildConfigsWhereUniqueInput
    update?: XOR<XOR<GuildConfigsUpdateToOneWithWhereWithoutStrikesInput, GuildConfigsUpdateWithoutStrikesInput>, GuildConfigsUncheckedUpdateWithoutStrikesInput>
  }

  export type NumbersCreateNestedOneWithoutPhonebookInput = {
    create?: XOR<NumbersCreateWithoutPhonebookInput, NumbersUncheckedCreateWithoutPhonebookInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutPhonebookInput
    connect?: NumbersWhereUniqueInput
  }

  export type NumbersUpdateOneRequiredWithoutPhonebookNestedInput = {
    create?: XOR<NumbersCreateWithoutPhonebookInput, NumbersUncheckedCreateWithoutPhonebookInput>
    connectOrCreate?: NumbersCreateOrConnectWithoutPhonebookInput
    upsert?: NumbersUpsertWithoutPhonebookInput
    connect?: NumbersWhereUniqueInput
    update?: XOR<XOR<NumbersUpdateToOneWithWhereWithoutPhonebookInput, NumbersUpdateWithoutPhonebookInput>, NumbersUncheckedUpdateWithoutPhonebookInput>
  }

  export type AccountsCreateNestedOneWithoutVotesInput = {
    create?: XOR<AccountsCreateWithoutVotesInput, AccountsUncheckedCreateWithoutVotesInput>
    connectOrCreate?: AccountsCreateOrConnectWithoutVotesInput
    connect?: AccountsWhereUniqueInput
  }

  export type AccountsUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<AccountsCreateWithoutVotesInput, AccountsUncheckedCreateWithoutVotesInput>
    connectOrCreate?: AccountsCreateOrConnectWithoutVotesInput
    upsert?: AccountsUpsertWithoutVotesInput
    connect?: AccountsWhereUniqueInput
    update?: XOR<XOR<AccountsUpdateToOneWithWhereWithoutVotesInput, AccountsUpdateWithoutVotesInput>, AccountsUncheckedUpdateWithoutVotesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type mailboxMessageWhereInput = {
    AND?: mailboxMessageWhereInput | mailboxMessageWhereInput[]
    OR?: mailboxMessageWhereInput[]
    NOT?: mailboxMessageWhereInput | mailboxMessageWhereInput[]
    id?: StringFilter<"mailboxMessage"> | string
    from?: StringFilter<"mailboxMessage"> | string
    message?: StringFilter<"mailboxMessage"> | string
    sent?: XOR<AtAndByCompositeFilter, atAndByObjectEqualityInput>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    name?: StringFilter<"Contact"> | string
    number?: StringFilter<"Contact"> | string
    description?: StringFilter<"Contact"> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type numberVIPWhereInput = {
    AND?: numberVIPWhereInput | numberVIPWhereInput[]
    OR?: numberVIPWhereInput[]
    NOT?: numberVIPWhereInput | numberVIPWhereInput[]
    expiry?: DateTimeFilter<"numberVIP"> | Date | string
    hidden?: BoolFilter<"numberVIP"> | boolean
    name?: StringFilter<"numberVIP"> | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type atAndByWhereInput = {
    AND?: atAndByWhereInput | atAndByWhereInput[]
    OR?: atAndByWhereInput[]
    NOT?: atAndByWhereInput | atAndByWhereInput[]
    at?: DateTimeFilter<"atAndBy"> | Date | string
    by?: StringFilter<"atAndBy"> | string
  }

  export type onHoldWhereInput = {
    AND?: onHoldWhereInput | onHoldWhereInput[]
    OR?: onHoldWhereInput[]
    NOT?: onHoldWhereInput | onHoldWhereInput[]
    onHold?: BoolFilter<"onHold"> | boolean
    holdingSide?: StringNullableFilter<"onHold"> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumStrikeOffenderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StrikeOffenderType | EnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StrikeOffenderType[] | ListEnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StrikeOffenderType[] | ListEnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStrikeOffenderTypeFilter<$PrismaModel> | $Enums.StrikeOffenderType
  }

  export type NestedEnumStrikeOffenderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StrikeOffenderType | EnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StrikeOffenderType[] | ListEnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StrikeOffenderType[] | ListEnumStrikeOffenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStrikeOffenderTypeWithAggregatesFilter<$PrismaModel> | $Enums.StrikeOffenderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStrikeOffenderTypeFilter<$PrismaModel>
    _max?: NestedEnumStrikeOffenderTypeFilter<$PrismaModel>
  }

  export type NumbersCreateWithoutMailboxInput = {
    channelID: string
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    outgoingCalls?: ActiveCallsCreateNestedManyWithoutToInput
    incomingCalls?: ActiveCallsCreateNestedManyWithoutFromInput
    guild?: GuildConfigsCreateNestedOneWithoutNumbersInput
    phonebook?: PhonebookCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersUncheckedCreateWithoutMailboxInput = {
    channelID: string
    guildID?: string | null
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutToInput
    incomingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutFromInput
    phonebook?: PhonebookUncheckedCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersCreateOrConnectWithoutMailboxInput = {
    where: NumbersWhereUniqueInput
    create: XOR<NumbersCreateWithoutMailboxInput, NumbersUncheckedCreateWithoutMailboxInput>
  }

  export type mailboxMessageUpdateManyInput = {
    where: mailboxMessageWhereInput
    data: mailboxMessageUpdateInput
  }

  export type mailboxMessageDeleteManyInput = {
    where: mailboxMessageWhereInput
  }

  export type NumbersUpsertWithoutMailboxInput = {
    update: XOR<NumbersUpdateWithoutMailboxInput, NumbersUncheckedUpdateWithoutMailboxInput>
    create: XOR<NumbersCreateWithoutMailboxInput, NumbersUncheckedCreateWithoutMailboxInput>
    where?: NumbersWhereInput
  }

  export type NumbersUpdateToOneWithWhereWithoutMailboxInput = {
    where?: NumbersWhereInput
    data: XOR<NumbersUpdateWithoutMailboxInput, NumbersUncheckedUpdateWithoutMailboxInput>
  }

  export type NumbersUpdateWithoutMailboxInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    outgoingCalls?: ActiveCallsUpdateManyWithoutToNestedInput
    incomingCalls?: ActiveCallsUpdateManyWithoutFromNestedInput
    guild?: GuildConfigsUpdateOneWithoutNumbersNestedInput
    phonebook?: PhonebookUpdateOneWithoutNumberDocNestedInput
  }

  export type NumbersUncheckedUpdateWithoutMailboxInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    guildID?: NullableStringFieldUpdateOperationsInput | string | null
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedUpdateManyWithoutToNestedInput
    incomingCalls?: ActiveCallsUncheckedUpdateManyWithoutFromNestedInput
    phonebook?: PhonebookUncheckedUpdateOneWithoutNumberDocNestedInput
  }

  export type MailboxCreateWithoutNumberDocInput = {
    number: string
    autoreply?: string
    receiving?: boolean
    messages?: XOR<mailboxMessageListCreateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
  }

  export type MailboxUncheckedCreateWithoutNumberDocInput = {
    number: string
    autoreply?: string
    receiving?: boolean
    messages?: XOR<mailboxMessageListCreateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
  }

  export type MailboxCreateOrConnectWithoutNumberDocInput = {
    where: MailboxWhereUniqueInput
    create: XOR<MailboxCreateWithoutNumberDocInput, MailboxUncheckedCreateWithoutNumberDocInput>
  }

  export type ActiveCallsCreateWithoutToInput = {
    id: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
    from?: NumbersCreateNestedOneWithoutIncomingCallsInput
  }

  export type ActiveCallsUncheckedCreateWithoutToInput = {
    id: string
    fromNum: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsCreateOrConnectWithoutToInput = {
    where: ActiveCallsWhereUniqueInput
    create: XOR<ActiveCallsCreateWithoutToInput, ActiveCallsUncheckedCreateWithoutToInput>
  }

  export type ActiveCallsCreateManyToInputEnvelope = {
    data: ActiveCallsCreateManyToInput | ActiveCallsCreateManyToInput[]
  }

  export type ActiveCallsCreateWithoutFromInput = {
    id: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
    to?: NumbersCreateNestedOneWithoutOutgoingCallsInput
  }

  export type ActiveCallsUncheckedCreateWithoutFromInput = {
    id: string
    toNum: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsCreateOrConnectWithoutFromInput = {
    where: ActiveCallsWhereUniqueInput
    create: XOR<ActiveCallsCreateWithoutFromInput, ActiveCallsUncheckedCreateWithoutFromInput>
  }

  export type ActiveCallsCreateManyFromInputEnvelope = {
    data: ActiveCallsCreateManyFromInput | ActiveCallsCreateManyFromInput[]
  }

  export type GuildConfigsCreateWithoutNumbersInput = {
    id: string
    whitelisted?: boolean
    locale?: string
    strikes?: StrikesCreateNestedManyWithoutGuildConfigInput
  }

  export type GuildConfigsUncheckedCreateWithoutNumbersInput = {
    id: string
    whitelisted?: boolean
    locale?: string
    strikes?: StrikesUncheckedCreateNestedManyWithoutGuildConfigInput
  }

  export type GuildConfigsCreateOrConnectWithoutNumbersInput = {
    where: GuildConfigsWhereUniqueInput
    create: XOR<GuildConfigsCreateWithoutNumbersInput, GuildConfigsUncheckedCreateWithoutNumbersInput>
  }

  export type PhonebookCreateWithoutNumberDocInput = {
    description: string
  }

  export type PhonebookUncheckedCreateWithoutNumberDocInput = {
    description: string
  }

  export type PhonebookCreateOrConnectWithoutNumberDocInput = {
    where: PhonebookWhereUniqueInput
    create: XOR<PhonebookCreateWithoutNumberDocInput, PhonebookUncheckedCreateWithoutNumberDocInput>
  }

  export type ContactUpdateManyInput = {
    where: ContactWhereInput
    data: ContactUpdateInput
  }

  export type ContactDeleteManyInput = {
    where: ContactWhereInput
  }

  export type numberVIPUpsertInput = {
    set: numberVIPCreateInput | null
    update: numberVIPUpdateInput
  }

  export type MailboxUpsertWithoutNumberDocInput = {
    update: XOR<MailboxUpdateWithoutNumberDocInput, MailboxUncheckedUpdateWithoutNumberDocInput>
    create: XOR<MailboxCreateWithoutNumberDocInput, MailboxUncheckedCreateWithoutNumberDocInput>
    where?: MailboxWhereInput
  }

  export type MailboxUpdateToOneWithWhereWithoutNumberDocInput = {
    where?: MailboxWhereInput
    data: XOR<MailboxUpdateWithoutNumberDocInput, MailboxUncheckedUpdateWithoutNumberDocInput>
  }

  export type MailboxUpdateWithoutNumberDocInput = {
    autoreply?: StringFieldUpdateOperationsInput | string
    receiving?: BoolFieldUpdateOperationsInput | boolean
    messages?: XOR<mailboxMessageListUpdateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
  }

  export type MailboxUncheckedUpdateWithoutNumberDocInput = {
    autoreply?: StringFieldUpdateOperationsInput | string
    receiving?: BoolFieldUpdateOperationsInput | boolean
    messages?: XOR<mailboxMessageListUpdateEnvelopeInput, mailboxMessageCreateInput> | mailboxMessageCreateInput[]
  }

  export type ActiveCallsUpsertWithWhereUniqueWithoutToInput = {
    where: ActiveCallsWhereUniqueInput
    update: XOR<ActiveCallsUpdateWithoutToInput, ActiveCallsUncheckedUpdateWithoutToInput>
    create: XOR<ActiveCallsCreateWithoutToInput, ActiveCallsUncheckedCreateWithoutToInput>
  }

  export type ActiveCallsUpdateWithWhereUniqueWithoutToInput = {
    where: ActiveCallsWhereUniqueInput
    data: XOR<ActiveCallsUpdateWithoutToInput, ActiveCallsUncheckedUpdateWithoutToInput>
  }

  export type ActiveCallsUpdateManyWithWhereWithoutToInput = {
    where: ActiveCallsScalarWhereInput
    data: XOR<ActiveCallsUpdateManyMutationInput, ActiveCallsUncheckedUpdateManyWithoutToInput>
  }

  export type ActiveCallsScalarWhereInput = {
    AND?: ActiveCallsScalarWhereInput | ActiveCallsScalarWhereInput[]
    OR?: ActiveCallsScalarWhereInput[]
    NOT?: ActiveCallsScalarWhereInput | ActiveCallsScalarWhereInput[]
    id?: StringFilter<"ActiveCalls"> | string
    toNum?: StringFilter<"ActiveCalls"> | string
    fromNum?: StringFilter<"ActiveCalls"> | string
    randomCall?: BoolFilter<"ActiveCalls"> | boolean
  }

  export type ActiveCallsUpsertWithWhereUniqueWithoutFromInput = {
    where: ActiveCallsWhereUniqueInput
    update: XOR<ActiveCallsUpdateWithoutFromInput, ActiveCallsUncheckedUpdateWithoutFromInput>
    create: XOR<ActiveCallsCreateWithoutFromInput, ActiveCallsUncheckedCreateWithoutFromInput>
  }

  export type ActiveCallsUpdateWithWhereUniqueWithoutFromInput = {
    where: ActiveCallsWhereUniqueInput
    data: XOR<ActiveCallsUpdateWithoutFromInput, ActiveCallsUncheckedUpdateWithoutFromInput>
  }

  export type ActiveCallsUpdateManyWithWhereWithoutFromInput = {
    where: ActiveCallsScalarWhereInput
    data: XOR<ActiveCallsUpdateManyMutationInput, ActiveCallsUncheckedUpdateManyWithoutFromInput>
  }

  export type GuildConfigsUpsertWithoutNumbersInput = {
    update: XOR<GuildConfigsUpdateWithoutNumbersInput, GuildConfigsUncheckedUpdateWithoutNumbersInput>
    create: XOR<GuildConfigsCreateWithoutNumbersInput, GuildConfigsUncheckedCreateWithoutNumbersInput>
    where?: GuildConfigsWhereInput
  }

  export type GuildConfigsUpdateToOneWithWhereWithoutNumbersInput = {
    where?: GuildConfigsWhereInput
    data: XOR<GuildConfigsUpdateWithoutNumbersInput, GuildConfigsUncheckedUpdateWithoutNumbersInput>
  }

  export type GuildConfigsUpdateWithoutNumbersInput = {
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    locale?: StringFieldUpdateOperationsInput | string
    strikes?: StrikesUpdateManyWithoutGuildConfigNestedInput
  }

  export type GuildConfigsUncheckedUpdateWithoutNumbersInput = {
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    locale?: StringFieldUpdateOperationsInput | string
    strikes?: StrikesUncheckedUpdateManyWithoutGuildConfigNestedInput
  }

  export type PhonebookUpsertWithoutNumberDocInput = {
    update: XOR<PhonebookUpdateWithoutNumberDocInput, PhonebookUncheckedUpdateWithoutNumberDocInput>
    create: XOR<PhonebookCreateWithoutNumberDocInput, PhonebookUncheckedCreateWithoutNumberDocInput>
    where?: PhonebookWhereInput
  }

  export type PhonebookUpdateToOneWithWhereWithoutNumberDocInput = {
    where?: PhonebookWhereInput
    data: XOR<PhonebookUpdateWithoutNumberDocInput, PhonebookUncheckedUpdateWithoutNumberDocInput>
  }

  export type PhonebookUpdateWithoutNumberDocInput = {
    description?: StringFieldUpdateOperationsInput | string
  }

  export type PhonebookUncheckedUpdateWithoutNumberDocInput = {
    description?: StringFieldUpdateOperationsInput | string
  }

  export type NumbersCreateWithoutOutgoingCallsInput = {
    channelID: string
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    mailbox?: MailboxCreateNestedOneWithoutNumberDocInput
    incomingCalls?: ActiveCallsCreateNestedManyWithoutFromInput
    guild?: GuildConfigsCreateNestedOneWithoutNumbersInput
    phonebook?: PhonebookCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersUncheckedCreateWithoutOutgoingCallsInput = {
    number: string
    channelID: string
    guildID?: string | null
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    incomingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutFromInput
    phonebook?: PhonebookUncheckedCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersCreateOrConnectWithoutOutgoingCallsInput = {
    where: NumbersWhereUniqueInput
    create: XOR<NumbersCreateWithoutOutgoingCallsInput, NumbersUncheckedCreateWithoutOutgoingCallsInput>
  }

  export type NumbersCreateWithoutIncomingCallsInput = {
    channelID: string
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    mailbox?: MailboxCreateNestedOneWithoutNumberDocInput
    outgoingCalls?: ActiveCallsCreateNestedManyWithoutToInput
    guild?: GuildConfigsCreateNestedOneWithoutNumbersInput
    phonebook?: PhonebookCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersUncheckedCreateWithoutIncomingCallsInput = {
    number: string
    channelID: string
    guildID?: string | null
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutToInput
    phonebook?: PhonebookUncheckedCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersCreateOrConnectWithoutIncomingCallsInput = {
    where: NumbersWhereUniqueInput
    create: XOR<NumbersCreateWithoutIncomingCallsInput, NumbersUncheckedCreateWithoutIncomingCallsInput>
  }

  export type atAndByUpsertInput = {
    set: atAndByCreateInput | null
    update: atAndByUpdateInput
  }

  export type atAndByUpdateInput = {
    at?: DateTimeFieldUpdateOperationsInput | Date | string
    by?: StringFieldUpdateOperationsInput | string
  }

  export type onHoldUpdateInput = {
    onHold?: BoolFieldUpdateOperationsInput | boolean
    holdingSide?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NumbersUpsertWithoutOutgoingCallsInput = {
    update: XOR<NumbersUpdateWithoutOutgoingCallsInput, NumbersUncheckedUpdateWithoutOutgoingCallsInput>
    create: XOR<NumbersCreateWithoutOutgoingCallsInput, NumbersUncheckedCreateWithoutOutgoingCallsInput>
    where?: NumbersWhereInput
  }

  export type NumbersUpdateToOneWithWhereWithoutOutgoingCallsInput = {
    where?: NumbersWhereInput
    data: XOR<NumbersUpdateWithoutOutgoingCallsInput, NumbersUncheckedUpdateWithoutOutgoingCallsInput>
  }

  export type NumbersUpdateWithoutOutgoingCallsInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    mailbox?: MailboxUpdateOneWithoutNumberDocNestedInput
    incomingCalls?: ActiveCallsUpdateManyWithoutFromNestedInput
    guild?: GuildConfigsUpdateOneWithoutNumbersNestedInput
    phonebook?: PhonebookUpdateOneWithoutNumberDocNestedInput
  }

  export type NumbersUncheckedUpdateWithoutOutgoingCallsInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    guildID?: NullableStringFieldUpdateOperationsInput | string | null
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    incomingCalls?: ActiveCallsUncheckedUpdateManyWithoutFromNestedInput
    phonebook?: PhonebookUncheckedUpdateOneWithoutNumberDocNestedInput
  }

  export type NumbersUpsertWithoutIncomingCallsInput = {
    update: XOR<NumbersUpdateWithoutIncomingCallsInput, NumbersUncheckedUpdateWithoutIncomingCallsInput>
    create: XOR<NumbersCreateWithoutIncomingCallsInput, NumbersUncheckedCreateWithoutIncomingCallsInput>
    where?: NumbersWhereInput
  }

  export type NumbersUpdateToOneWithWhereWithoutIncomingCallsInput = {
    where?: NumbersWhereInput
    data: XOR<NumbersUpdateWithoutIncomingCallsInput, NumbersUncheckedUpdateWithoutIncomingCallsInput>
  }

  export type NumbersUpdateWithoutIncomingCallsInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    mailbox?: MailboxUpdateOneWithoutNumberDocNestedInput
    outgoingCalls?: ActiveCallsUpdateManyWithoutToNestedInput
    guild?: GuildConfigsUpdateOneWithoutNumbersNestedInput
    phonebook?: PhonebookUpdateOneWithoutNumberDocNestedInput
  }

  export type NumbersUncheckedUpdateWithoutIncomingCallsInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    guildID?: NullableStringFieldUpdateOperationsInput | string | null
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedUpdateManyWithoutToNestedInput
    phonebook?: PhonebookUncheckedUpdateOneWithoutNumberDocNestedInput
  }

  export type NumbersCreateWithoutGuildInput = {
    channelID: string
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    mailbox?: MailboxCreateNestedOneWithoutNumberDocInput
    outgoingCalls?: ActiveCallsCreateNestedManyWithoutToInput
    incomingCalls?: ActiveCallsCreateNestedManyWithoutFromInput
    phonebook?: PhonebookCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersUncheckedCreateWithoutGuildInput = {
    number: string
    channelID: string
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutToInput
    incomingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutFromInput
    phonebook?: PhonebookUncheckedCreateNestedOneWithoutNumberDocInput
  }

  export type NumbersCreateOrConnectWithoutGuildInput = {
    where: NumbersWhereUniqueInput
    create: XOR<NumbersCreateWithoutGuildInput, NumbersUncheckedCreateWithoutGuildInput>
  }

  export type NumbersCreateManyGuildInputEnvelope = {
    data: NumbersCreateManyGuildInput | NumbersCreateManyGuildInput[]
  }

  export type StrikesCreateWithoutGuildConfigInput = {
    id: string
    reason: string
    type: $Enums.StrikeOffenderType
    created: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    account: AccountsCreateNestedOneWithoutStrikesInput
  }

  export type StrikesUncheckedCreateWithoutGuildConfigInput = {
    id: string
    reason: string
    type: $Enums.StrikeOffenderType
    created: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesCreateOrConnectWithoutGuildConfigInput = {
    where: StrikesWhereUniqueInput
    create: XOR<StrikesCreateWithoutGuildConfigInput, StrikesUncheckedCreateWithoutGuildConfigInput>
  }

  export type StrikesCreateManyGuildConfigInputEnvelope = {
    data: StrikesCreateManyGuildConfigInput | StrikesCreateManyGuildConfigInput[]
  }

  export type NumbersUpsertWithWhereUniqueWithoutGuildInput = {
    where: NumbersWhereUniqueInput
    update: XOR<NumbersUpdateWithoutGuildInput, NumbersUncheckedUpdateWithoutGuildInput>
    create: XOR<NumbersCreateWithoutGuildInput, NumbersUncheckedCreateWithoutGuildInput>
  }

  export type NumbersUpdateWithWhereUniqueWithoutGuildInput = {
    where: NumbersWhereUniqueInput
    data: XOR<NumbersUpdateWithoutGuildInput, NumbersUncheckedUpdateWithoutGuildInput>
  }

  export type NumbersUpdateManyWithWhereWithoutGuildInput = {
    where: NumbersScalarWhereInput
    data: XOR<NumbersUpdateManyMutationInput, NumbersUncheckedUpdateManyWithoutGuildInput>
  }

  export type NumbersScalarWhereInput = {
    AND?: NumbersScalarWhereInput | NumbersScalarWhereInput[]
    OR?: NumbersScalarWhereInput[]
    NOT?: NumbersScalarWhereInput | NumbersScalarWhereInput[]
    number?: StringFilter<"Numbers"> | string
    channelID?: StringFilter<"Numbers"> | string
    guildID?: StringNullableFilter<"Numbers"> | string | null
    userID?: StringNullableFilter<"Numbers"> | string | null
    blocked?: StringNullableListFilter<"Numbers">
    expiry?: DateTimeFilter<"Numbers"> | Date | string
    mentions?: StringNullableListFilter<"Numbers">
    waiting?: BoolFilter<"Numbers"> | boolean
    createdAt?: DateTimeFilter<"Numbers"> | Date | string
    fka?: StringNullableListFilter<"Numbers">
  }

  export type StrikesUpsertWithWhereUniqueWithoutGuildConfigInput = {
    where: StrikesWhereUniqueInput
    update: XOR<StrikesUpdateWithoutGuildConfigInput, StrikesUncheckedUpdateWithoutGuildConfigInput>
    create: XOR<StrikesCreateWithoutGuildConfigInput, StrikesUncheckedCreateWithoutGuildConfigInput>
  }

  export type StrikesUpdateWithWhereUniqueWithoutGuildConfigInput = {
    where: StrikesWhereUniqueInput
    data: XOR<StrikesUpdateWithoutGuildConfigInput, StrikesUncheckedUpdateWithoutGuildConfigInput>
  }

  export type StrikesUpdateManyWithWhereWithoutGuildConfigInput = {
    where: StrikesScalarWhereInput
    data: XOR<StrikesUpdateManyMutationInput, StrikesUncheckedUpdateManyWithoutGuildConfigInput>
  }

  export type StrikesScalarWhereInput = {
    AND?: StrikesScalarWhereInput | StrikesScalarWhereInput[]
    OR?: StrikesScalarWhereInput[]
    NOT?: StrikesScalarWhereInput | StrikesScalarWhereInput[]
    id?: StringFilter<"Strikes"> | string
    offender?: StringFilter<"Strikes"> | string
    reason?: StringFilter<"Strikes"> | string
    type?: EnumStrikeOffenderTypeFilter<"Strikes"> | $Enums.StrikeOffenderType
  }

  export type StrikesCreateWithoutAccountInput = {
    id: string
    reason: string
    type: $Enums.StrikeOffenderType
    created: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    guildConfig: GuildConfigsCreateNestedOneWithoutStrikesInput
  }

  export type StrikesUncheckedCreateWithoutAccountInput = {
    id: string
    reason: string
    type: $Enums.StrikeOffenderType
    created: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesCreateOrConnectWithoutAccountInput = {
    where: StrikesWhereUniqueInput
    create: XOR<StrikesCreateWithoutAccountInput, StrikesUncheckedCreateWithoutAccountInput>
  }

  export type StrikesCreateManyAccountInputEnvelope = {
    data: StrikesCreateManyAccountInput | StrikesCreateManyAccountInput[]
  }

  export type VotesCreateWithoutAccountInput = {
    count?: number
  }

  export type VotesUncheckedCreateWithoutAccountInput = {
    count?: number
  }

  export type VotesCreateOrConnectWithoutAccountInput = {
    where: VotesWhereUniqueInput
    create: XOR<VotesCreateWithoutAccountInput, VotesUncheckedCreateWithoutAccountInput>
  }

  export type StrikesUpsertWithWhereUniqueWithoutAccountInput = {
    where: StrikesWhereUniqueInput
    update: XOR<StrikesUpdateWithoutAccountInput, StrikesUncheckedUpdateWithoutAccountInput>
    create: XOR<StrikesCreateWithoutAccountInput, StrikesUncheckedCreateWithoutAccountInput>
  }

  export type StrikesUpdateWithWhereUniqueWithoutAccountInput = {
    where: StrikesWhereUniqueInput
    data: XOR<StrikesUpdateWithoutAccountInput, StrikesUncheckedUpdateWithoutAccountInput>
  }

  export type StrikesUpdateManyWithWhereWithoutAccountInput = {
    where: StrikesScalarWhereInput
    data: XOR<StrikesUpdateManyMutationInput, StrikesUncheckedUpdateManyWithoutAccountInput>
  }

  export type VotesUpsertWithoutAccountInput = {
    update: XOR<VotesUpdateWithoutAccountInput, VotesUncheckedUpdateWithoutAccountInput>
    create: XOR<VotesCreateWithoutAccountInput, VotesUncheckedCreateWithoutAccountInput>
    where?: VotesWhereInput
  }

  export type VotesUpdateToOneWithWhereWithoutAccountInput = {
    where?: VotesWhereInput
    data: XOR<VotesUpdateWithoutAccountInput, VotesUncheckedUpdateWithoutAccountInput>
  }

  export type VotesUpdateWithoutAccountInput = {
    count?: IntFieldUpdateOperationsInput | number
  }

  export type VotesUncheckedUpdateWithoutAccountInput = {
    count?: IntFieldUpdateOperationsInput | number
  }

  export type AccountsCreateWithoutStrikesInput = {
    id: string
    balance?: number
    dailyClaimedAt?: Date | string | null
    vipMonthsRemaining?: number
    Votes?: VotesCreateNestedOneWithoutAccountInput
  }

  export type AccountsUncheckedCreateWithoutStrikesInput = {
    id: string
    balance?: number
    dailyClaimedAt?: Date | string | null
    vipMonthsRemaining?: number
    Votes?: VotesUncheckedCreateNestedOneWithoutAccountInput
  }

  export type AccountsCreateOrConnectWithoutStrikesInput = {
    where: AccountsWhereUniqueInput
    create: XOR<AccountsCreateWithoutStrikesInput, AccountsUncheckedCreateWithoutStrikesInput>
  }

  export type GuildConfigsCreateWithoutStrikesInput = {
    id: string
    whitelisted?: boolean
    locale?: string
    numbers?: NumbersCreateNestedManyWithoutGuildInput
  }

  export type GuildConfigsUncheckedCreateWithoutStrikesInput = {
    id: string
    whitelisted?: boolean
    locale?: string
    numbers?: NumbersUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildConfigsCreateOrConnectWithoutStrikesInput = {
    where: GuildConfigsWhereUniqueInput
    create: XOR<GuildConfigsCreateWithoutStrikesInput, GuildConfigsUncheckedCreateWithoutStrikesInput>
  }

  export type AccountsUpsertWithoutStrikesInput = {
    update: XOR<AccountsUpdateWithoutStrikesInput, AccountsUncheckedUpdateWithoutStrikesInput>
    create: XOR<AccountsCreateWithoutStrikesInput, AccountsUncheckedCreateWithoutStrikesInput>
    where?: AccountsWhereInput
  }

  export type AccountsUpdateToOneWithWhereWithoutStrikesInput = {
    where?: AccountsWhereInput
    data: XOR<AccountsUpdateWithoutStrikesInput, AccountsUncheckedUpdateWithoutStrikesInput>
  }

  export type AccountsUpdateWithoutStrikesInput = {
    balance?: FloatFieldUpdateOperationsInput | number
    dailyClaimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vipMonthsRemaining?: IntFieldUpdateOperationsInput | number
    Votes?: VotesUpdateOneWithoutAccountNestedInput
  }

  export type AccountsUncheckedUpdateWithoutStrikesInput = {
    balance?: FloatFieldUpdateOperationsInput | number
    dailyClaimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vipMonthsRemaining?: IntFieldUpdateOperationsInput | number
    Votes?: VotesUncheckedUpdateOneWithoutAccountNestedInput
  }

  export type GuildConfigsUpsertWithoutStrikesInput = {
    update: XOR<GuildConfigsUpdateWithoutStrikesInput, GuildConfigsUncheckedUpdateWithoutStrikesInput>
    create: XOR<GuildConfigsCreateWithoutStrikesInput, GuildConfigsUncheckedCreateWithoutStrikesInput>
    where?: GuildConfigsWhereInput
  }

  export type GuildConfigsUpdateToOneWithWhereWithoutStrikesInput = {
    where?: GuildConfigsWhereInput
    data: XOR<GuildConfigsUpdateWithoutStrikesInput, GuildConfigsUncheckedUpdateWithoutStrikesInput>
  }

  export type GuildConfigsUpdateWithoutStrikesInput = {
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    locale?: StringFieldUpdateOperationsInput | string
    numbers?: NumbersUpdateManyWithoutGuildNestedInput
  }

  export type GuildConfigsUncheckedUpdateWithoutStrikesInput = {
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    locale?: StringFieldUpdateOperationsInput | string
    numbers?: NumbersUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type NumbersCreateWithoutPhonebookInput = {
    channelID: string
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    mailbox?: MailboxCreateNestedOneWithoutNumberDocInput
    outgoingCalls?: ActiveCallsCreateNestedManyWithoutToInput
    incomingCalls?: ActiveCallsCreateNestedManyWithoutFromInput
    guild?: GuildConfigsCreateNestedOneWithoutNumbersInput
  }

  export type NumbersUncheckedCreateWithoutPhonebookInput = {
    number: string
    channelID: string
    guildID?: string | null
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutToInput
    incomingCalls?: ActiveCallsUncheckedCreateNestedManyWithoutFromInput
  }

  export type NumbersCreateOrConnectWithoutPhonebookInput = {
    where: NumbersWhereUniqueInput
    create: XOR<NumbersCreateWithoutPhonebookInput, NumbersUncheckedCreateWithoutPhonebookInput>
  }

  export type NumbersUpsertWithoutPhonebookInput = {
    update: XOR<NumbersUpdateWithoutPhonebookInput, NumbersUncheckedUpdateWithoutPhonebookInput>
    create: XOR<NumbersCreateWithoutPhonebookInput, NumbersUncheckedCreateWithoutPhonebookInput>
    where?: NumbersWhereInput
  }

  export type NumbersUpdateToOneWithWhereWithoutPhonebookInput = {
    where?: NumbersWhereInput
    data: XOR<NumbersUpdateWithoutPhonebookInput, NumbersUncheckedUpdateWithoutPhonebookInput>
  }

  export type NumbersUpdateWithoutPhonebookInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    mailbox?: MailboxUpdateOneWithoutNumberDocNestedInput
    outgoingCalls?: ActiveCallsUpdateManyWithoutToNestedInput
    incomingCalls?: ActiveCallsUpdateManyWithoutFromNestedInput
    guild?: GuildConfigsUpdateOneWithoutNumbersNestedInput
  }

  export type NumbersUncheckedUpdateWithoutPhonebookInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    guildID?: NullableStringFieldUpdateOperationsInput | string | null
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedUpdateManyWithoutToNestedInput
    incomingCalls?: ActiveCallsUncheckedUpdateManyWithoutFromNestedInput
  }

  export type AccountsCreateWithoutVotesInput = {
    id: string
    balance?: number
    dailyClaimedAt?: Date | string | null
    vipMonthsRemaining?: number
    strikes?: StrikesCreateNestedManyWithoutAccountInput
  }

  export type AccountsUncheckedCreateWithoutVotesInput = {
    id: string
    balance?: number
    dailyClaimedAt?: Date | string | null
    vipMonthsRemaining?: number
    strikes?: StrikesUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountsCreateOrConnectWithoutVotesInput = {
    where: AccountsWhereUniqueInput
    create: XOR<AccountsCreateWithoutVotesInput, AccountsUncheckedCreateWithoutVotesInput>
  }

  export type AccountsUpsertWithoutVotesInput = {
    update: XOR<AccountsUpdateWithoutVotesInput, AccountsUncheckedUpdateWithoutVotesInput>
    create: XOR<AccountsCreateWithoutVotesInput, AccountsUncheckedCreateWithoutVotesInput>
    where?: AccountsWhereInput
  }

  export type AccountsUpdateToOneWithWhereWithoutVotesInput = {
    where?: AccountsWhereInput
    data: XOR<AccountsUpdateWithoutVotesInput, AccountsUncheckedUpdateWithoutVotesInput>
  }

  export type AccountsUpdateWithoutVotesInput = {
    balance?: FloatFieldUpdateOperationsInput | number
    dailyClaimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vipMonthsRemaining?: IntFieldUpdateOperationsInput | number
    strikes?: StrikesUpdateManyWithoutAccountNestedInput
  }

  export type AccountsUncheckedUpdateWithoutVotesInput = {
    balance?: FloatFieldUpdateOperationsInput | number
    dailyClaimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vipMonthsRemaining?: IntFieldUpdateOperationsInput | number
    strikes?: StrikesUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type mailboxMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    sent?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
  }

  export type ActiveCallsCreateManyToInput = {
    id: string
    fromNum: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsCreateManyFromInput = {
    id: string
    toNum: string
    pickedUp?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: boolean
    started: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableCreateEnvelopeInput, atAndByCreateInput> | null
    hold: XOR<onHoldCreateEnvelopeInput, onHoldCreateInput>
  }

  export type ContactUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type numberVIPUpdateInput = {
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    hidden?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveCallsUpdateWithoutToInput = {
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
    from?: NumbersUpdateOneWithoutIncomingCallsNestedInput
  }

  export type ActiveCallsUncheckedUpdateWithoutToInput = {
    fromNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsUncheckedUpdateManyWithoutToInput = {
    fromNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsUpdateWithoutFromInput = {
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
    to?: NumbersUpdateOneWithoutOutgoingCallsNestedInput
  }

  export type ActiveCallsUncheckedUpdateWithoutFromInput = {
    toNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type ActiveCallsUncheckedUpdateManyWithoutFromInput = {
    toNum?: StringFieldUpdateOperationsInput | string
    pickedUp?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    randomCall?: BoolFieldUpdateOperationsInput | boolean
    started?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    ended?: XOR<atAndByNullableUpdateEnvelopeInput, atAndByCreateInput> | null
    hold?: XOR<onHoldUpdateEnvelopeInput, onHoldCreateInput>
  }

  export type NumbersCreateManyGuildInput = {
    number: string
    channelID: string
    userID?: string | null
    blocked?: NumbersCreateblockedInput | string[]
    contacts?: XOR<ContactListCreateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry: Date | string
    mentions?: NumbersCreatementionsInput | string[]
    vip?: XOR<numberVIPNullableCreateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: boolean
    createdAt?: Date | string
    fka?: NumbersCreatefkaInput | string[]
  }

  export type StrikesCreateManyGuildConfigInput = {
    id: string
    reason: string
    type: $Enums.StrikeOffenderType
    created: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
  }

  export type NumbersUpdateWithoutGuildInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    mailbox?: MailboxUpdateOneWithoutNumberDocNestedInput
    outgoingCalls?: ActiveCallsUpdateManyWithoutToNestedInput
    incomingCalls?: ActiveCallsUpdateManyWithoutFromNestedInput
    phonebook?: PhonebookUpdateOneWithoutNumberDocNestedInput
  }

  export type NumbersUncheckedUpdateWithoutGuildInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
    outgoingCalls?: ActiveCallsUncheckedUpdateManyWithoutToNestedInput
    incomingCalls?: ActiveCallsUncheckedUpdateManyWithoutFromNestedInput
    phonebook?: PhonebookUncheckedUpdateOneWithoutNumberDocNestedInput
  }

  export type NumbersUncheckedUpdateManyWithoutGuildInput = {
    channelID?: StringFieldUpdateOperationsInput | string
    userID?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: NumbersUpdateblockedInput | string[]
    contacts?: XOR<ContactListUpdateEnvelopeInput, ContactCreateInput> | ContactCreateInput[]
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    mentions?: NumbersUpdatementionsInput | string[]
    vip?: XOR<numberVIPNullableUpdateEnvelopeInput, numberVIPCreateInput> | null
    waiting?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fka?: NumbersUpdatefkaInput | string[]
  }

  export type StrikesUpdateWithoutGuildConfigInput = {
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    account?: AccountsUpdateOneRequiredWithoutStrikesNestedInput
  }

  export type StrikesUncheckedUpdateWithoutGuildConfigInput = {
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesUncheckedUpdateManyWithoutGuildConfigInput = {
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesCreateManyAccountInput = {
    id: string
    reason: string
    type: $Enums.StrikeOffenderType
    created: XOR<atAndByCreateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesUpdateWithoutAccountInput = {
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
    guildConfig?: GuildConfigsUpdateOneRequiredWithoutStrikesNestedInput
  }

  export type StrikesUncheckedUpdateWithoutAccountInput = {
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
  }

  export type StrikesUncheckedUpdateManyWithoutAccountInput = {
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumStrikeOffenderTypeFieldUpdateOperationsInput | $Enums.StrikeOffenderType
    created?: XOR<atAndByUpdateEnvelopeInput, atAndByCreateInput>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
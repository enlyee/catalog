const envs = ['PORT', 'PG_HOST', 'PG_PORT', 'PG_USER', 'PG_PASS', 'PG_DBNAME'];

export type EnvironmentVariable = { [key: string]: string | undefined };

export type ConfigurationType = ReturnType<typeof getConfig>;

const getConfig = (environmentVariables: EnvironmentVariable) => {
  return {
    apiSettings: {
      PORT: environmentVariables.PORT,
    },

    typeOrmConfig: {
      type: 'postgres',
      host: environmentVariables.PG_HOST,
      port: environmentVariables.PG_PORT,
      username: environmentVariables.PG_USER,
      password: environmentVariables.PG_PASS,
      database: environmentVariables.PG_DBNAME,
      autoLoadEntities: true,
      synchronize: true,
    },
  };
};

export default () => {
  const environmentVariables = process.env as EnvironmentVariable;

  console.log('Getting ENV...');

  const errs = [];

  envs.forEach((env) => {
    const newEnv = environmentVariables[env];
    if (!newEnv) errs.push(env);
  });

  if (errs.length !== 0)
    throw new Error(
      'Wrong .env file data. Please, check it. Missing data: ' + errs.join(' '),
    );

  return getConfig(environmentVariables);
};

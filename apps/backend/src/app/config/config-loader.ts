import * as configJson from '../../../config/config.json';
import {ConfigLoader} from '@deltastone/nest-common/config';

const definition = {
  database: {
    host: {
      doc: 'Database host name/IP',
      format: 'url',
      default: '127.0.0.1',
      sensitive: true,
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 27017,
      sensitive: true,
    },
    database: {
      doc: 'Database name',
      format: String,
      default: 'nest',
      sensitive: true,
    },
    username: {
      doc: 'Database username',
      format: String,
      default: 'nest',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'nest',
    },
    replicaSet: {
      doc: 'Database replica set name',
      format: String,
      default: undefined,
    }
  },

  server: {
    address: {
      doc: 'The public address to bind.',
      format: 'url',
      default: 'http://localhost:4200',
    },
    applicationName: {
      doc: 'The name of the application.',
      format: String,
      default: 'DS App',
    },
    applicationColor: {
      doc: 'The color of the application.',
      format: String,
      default: '#bada55',
    },
    applicationIcon: {
      doc: 'The icon of the application.',
      format: String,
      default: 'pi pi-home',
    },
    applicationDomain: {
      doc: 'The domain of the application.',
      format: String,
      default: 'localhost',
    },
    ssrCaching: {
      doc: 'Enable server side rendering caching.',
      format: Boolean,
      default: false,
    },
  },
  cluster: {
    microApplications: {
      doc: 'Enable micro frontends. Serves routes to other micro frontends.',
      format: Boolean,
      default: false,
    }
  },
  ms: {
    host: {
      doc: 'Connection address for the ms provider',
      format: 'url',
      default: '127.0.0.1',
      sensitive: true
    },
    port: {
      doc: 'Connection port for the ms provider',
      format: 'port',
      default: 4222,
      sensitive: true
    },
    username: {
      doc: 'Connection username for the ms provider',
      format: String,
      default: '',
      sensitive: true
    },
    password: {
      doc: 'Connection password for the ms provider',
      format: String,
      default: '',
      sensitive: true
    },
  },
    example: {
      doc: 'Example config',
      format: String,
      sensitive: true,
      default: 'example',
  },
};

export const convictConfig = ConfigLoader.loadConfig(definition, configJson);



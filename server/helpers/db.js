const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('db connection established');
});

// CREATE TABLES

// create users table
const usersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        users(id integer NOT NULL,
        "firstName" text COLLATE pg_catalog."default" NOT NULL,
        "lastName" text COLLATE pg_catalog."default" NOT NULL,
        email text COLLATE pg_catalog."default" NOT NULL,
        password text COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT email UNIQUE (email)
    )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// create users table
const contactsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        contacts(
            "Id" integer NOT NULL,
            email text COLLATE pg_catalog."default",
            "firstName" text COLLATE pg_catalog."default",
            "lastName" text COLLATE pg_catalog."default",
            CONSTRAINT contacts_pkey PRIMARY KEY ("Id"),
            CONSTRAINT id FOREIGN KEY ("Id")
                REFERENCES public.users (id) MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE CASCADE
        )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// create messages table
const messagesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        messages(
            "msgId" integer NOT NULL,
            subject text COLLATE pg_catalog."default",
            message text COLLATE pg_catalog."default" NOT NULL,
            email text COLLATE pg_catalog."default" NOT NULL,
            status text COLLATE pg_catalog."default" NOT NULL,
            "senderId" integer NOT NULL,
            "receiverId" integer NOT NULL,
            "createdOn" timestamp with time zone NOT NULL,
            CONSTRAINT messages_pkey PRIMARY KEY ("msgId"),
            CONSTRAINT "msgId" FOREIGN KEY ("msgId")
                REFERENCES public.users (id) MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE CASCADE
        )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// create messages table
const childMessagesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        childmsgs(
            "parentMessageId" integer NOT NULL,
            subject text COLLATE pg_catalog."default",
            message text COLLATE pg_catalog."default" NOT NULL,
            email text COLLATE pg_catalog."default" NOT NULL,
            status text COLLATE pg_catalog."default",
            "senderId" integer NOT NULL,
            "messageId" text COLLATE pg_catalog."default" NOT NULL,
            "receiverId" integer NOT NULL,
            "createdOn" time without time zone NOT NULL,
            CONSTRAINT "childMessages_pkey" PRIMARY KEY ("parentMessageId"),
            CONSTRAINT "parentMessageId" FOREIGN KEY ("parentMessageId")
                REFERENCES public.messages ("msgId") MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE CASCADE
        )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// create groups table
const groupsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
          groups(
              id integer NOT NULL,
              name text COLLATE pg_catalog."default" NOT NULL,
              CONSTRAINT groups_pkey PRIMARY KEY (id),
              CONSTRAINT id FOREIGN KEY (id)
                  REFERENCES public.users (id) MATCH SIMPLE
                  ON UPDATE CASCADE
                  ON DELETE CASCADE
          )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// create messages table
const groupMembersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        grpmembers(
            "groupId" integer NOT NULL,
            "memberId" integer NOT NULL,
            email text COLLATE pg_catalog."default" NOT NULL,
            CONSTRAINT "groupMembers_pkey" PRIMARY KEY ("groupId"),
            CONSTRAINT "groupId" FOREIGN KEY ("groupId")
                REFERENCES public.groups (id) MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE CASCADE
        )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


// DROP TABLES

// Drop users table
const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Drop users table
const dropContactsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS contacts returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Drop messages table
const dropMessagesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS messages returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Drop messages table
const dropChildMessagesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS childmsgs returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Drop groups table
const dropGroupsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS groups returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Drop grpmembers table
const dropGroupMembersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS grpmembers returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export {
  usersTable,
  contactsTable,
  messagesTable,
  childMessagesTable,
  groupsTable,
  groupMembersTable,

  dropUsersTable,
  dropContactsTable,
  dropMessagesTable,
  dropChildMessagesTable,
  dropGroupsTable,
  dropGroupMembersTable,
};

require('make-runnable');

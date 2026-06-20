# MongoDB Atlas setup for MegaMart

1. Sign in at <https://cloud.mongodb.com> and create a project.
2. Create a free cluster (the **M0** option is enough for development).
3. Under **Security > Database Access**, create a database user with a strong,
   unique password. Grant it read/write access to the `megamart` database.
4. Under **Security > Network Access**, add your current IP for local work. For
   deployment, add the hosting provider's outbound IP. Avoid `0.0.0.0/0` when
   your provider offers fixed outbound IPs.
5. Open the cluster, choose **Connect > Drivers > Node.js**, and copy the
   `mongodb+srv://...` connection string.
6. Copy `.env.example` to `.env`. Set `MONGODB_URI`, replacing the username,
   password, and cluster host. If the password contains reserved URL characters,
   URL-encode it. Keep `MONGODB_DB_NAME=megamart`.
7. From the `backend` directory, import the product export:

   ```powershell
   npm.cmd run import:products
   ```

   The importer preserves ObjectIds and dates. It is safe to rerun: documents
   with the same `_id` are replaced rather than duplicated.
8. Start the API and verify that `GET /product/get_all_products` returns data:

   ```powershell
   npm.cmd start
   ```

For a deployed backend, set `MONGODB_URI`, `MONGODB_DB_NAME`, `PORT`, and
`CORS_ORIGIN` in the host's environment-variable dashboard. Do not upload the
`.env` file. Set `CORS_ORIGIN` to the deployed frontend URL (or comma-separate
the local and deployed URLs).

// import { currentUser } from "@clerk/nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
// const f = createUploadthing();

// export const ourFileRouter = {
//   pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
//     .middleware(async ({ req }) => {
//       const user = await currentUser();
//       if (!user) throw new UploadThingError("Unauthorized");
//       return { userId: user.id };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       console.log("Upload complete for user", metadata.userId);
//       console.log(file.ufsUrl);
//       return { userId: metadata.userId, fileUrl: file.ufsUrl };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;

import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for user", metadata.userId);
      console.log(file.ufsUrl);
      return {
        userId: metadata.userId,
        file: {
          ufsUrl: file.ufsUrl,
          name: file.name,
        },
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

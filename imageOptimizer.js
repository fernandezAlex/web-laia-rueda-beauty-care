import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import fs from "fs";
import path from "path";

const optimizeImages = async () => {
  try {
    const files = await imagemin(
      [
        "public/img/**/*.{jpg,png,gif,svg}",
        "public/img/tratamientos/**/*.{jpg,png,gif,svg}",
      ],
      {
        destination: "public/img",
        plugins: [
          imageminMozjpeg({ quality: 80 }),
          imageminPngquant({ quality: [0.6, 0.8] }),
          imageminGifsicle(),
          imageminSvgo(),
          imageminWebp({ quality: 80 }),
        ],
        flatten: false,
      }
    );

    files.forEach((file) => {
      const newPath = path.join(
        path.dirname(file.destinationPath),
        `${path.basename(
          file.destinationPath,
          path.extname(file.destinationPath)
        )}.webp`
      );
      fs.rename(file.destinationPath, newPath, (err) => {
        if (err) throw err;
        console.log("Image renamed to:", newPath);
      });
    });

    console.log("Images optimized successfully:", files);
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
};

optimizeImages();

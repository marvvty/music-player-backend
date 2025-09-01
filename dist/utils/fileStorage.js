import fs from "fs";
import path from "path";
export class FileStorage {
    static async saveMusic(req) {
        const uploadDirectory = path.join(process.cwd(), "uploads", "music");
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        const contentType = req.headers["content-type"] || "";
        let ext = ".mp3";
        if (contentType.includes("wav"))
            ext = ".wav";
        if (contentType.includes("ogg"))
            ext = ".ogg";
        if (contentType.includes("aac"))
            ext = ".aac";
        const fileName = Date.now() + ext;
        const filePath = path.join(uploadDirectory, fileName);
        const writeStream = fs.createWriteStream(filePath);
        req.pipe(writeStream);
        await new Promise((resolve, reject) => {
            writeStream.on("finish", () => resolve());
            writeStream.on("error", reject);
        });
        return `/uploads/music/${fileName}`;
    }
    static async deleteMusic(filePath) {
        try {
            const fullPath = path.join(process.cwd(), filePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }
        catch (error) {
            console.error("error with file", error);
        }
    }
}
//# sourceMappingURL=fileStorage.js.map
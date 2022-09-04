import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RTE = ({ setContent }) => {
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        // body.append("key", "ed8c4c8b6d2b250796cb4f051b4ee7a8");
                        body.append("image", file);
                        fetch(
                            `https://api.imgbb.com/1/upload?key=ed8c4c8b6d2b250796cb4f051b4ee7a8`,
                            {
                                method: "POST",
                                body: body,
                            }
                        )
                            .then((res) => res.json())
                            .then((res) => {
                                resolve({ default: res.data.display_url });
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                });
            },
        };
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                extraPlugins: [uploadPlugin],
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
                setContent(data);
            }}
        />
    );
};

export default RTE;

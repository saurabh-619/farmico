import * as editorIcons from "@/utils/assets";
import { Box } from "@chakra-ui/react";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  // @ts-ignore
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

interface ITextEditor {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<ITextEditor> = ({ setContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state);

    // @ts-ignore
    setContent(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  return (
    <Box>
      <Editor
        // @ts-ignore
        editorState={editorState}
        placeholder="Write something useful ...."
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName={"toolbar-class"}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "link",
            "image",
          ],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
            bold: {
              icon: editorIcons.boldIcon,
              className: "toolbar-icon",
            },
            italic: {
              icon: editorIcons.italicIcon,
              className: "toolbar-icon",
            },
            underline: {
              icon: editorIcons.underlineIcon,
              className: "toolbar-icon",
            },
            strikethrough: {
              icon: editorIcons.strikeThroughIcon,
              className: "toolbar-icon",
            },
            monospace: {
              icon: editorIcons.codeIcon,
              className: "toolbar-icon",
            },
          },
          blockType: {
            inDropdown: true,
            options: [
              "Normal",
              "H1",
              "H2",
              "H3",
              "H4",
              "H5",
              "H6",
              "Blockquote",
              "Code",
            ],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontSize: {
            // icon: fontSize,
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["unordered", "ordered"],
            unordered: {
              icon: editorIcons.listIcon,
              className: "toolbar-icon",
            },
            ordered: {
              icon: editorIcons.listOlIcon,
              className: "toolbar-icon",
            },
          },
          textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["left", "center", "right", "justify"],
            left: {
              icon: editorIcons.leftAlignIcon,
              className: "toolbar-icon",
            },
            center: {
              icon: editorIcons.centerAlignIcon,
              className: "toolbar-icon",
            },
            right: {
              icon: editorIcons.rightAlignIcon,
              className: "toolbar-icon",
            },
            justify: {
              icon: editorIcons.justifyAlignIcon,
              className: "toolbar-icon",
            },
          },
          link: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            dropdownClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: "_self",
            options: ["link"],
            link: {
              icon: editorIcons.linkIcon,
              className: "toolbar-icon",
            },
            linkCallback: undefined,
          },
          image: {
            icon: editorIcons.imageIcon,
            className: "toolbar-icon",
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: undefined,
            previewImage: false,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: "auto",
              width: "auto",
            },
          },
        }}
      />
    </Box>
  );
};

export default TextEditor;

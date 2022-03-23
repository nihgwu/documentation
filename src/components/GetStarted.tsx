import CodeArea from "./CodeArea"
import code from "./codeExamples/defaultExample"
import codeTs from "./codeExamples/defaultExampleTs"
import codeV6 from "./codeExamples/v6/defaultExample"
import codeTsV6 from "./codeExamples/v6/defaultExampleTs"
import * as React from "react"
import generic from "../data/generic"
import copyClipBoard from "./utils/copyClipBoard"
import { useStateMachine } from "little-state-machine"
import * as styles from "./GetStarted.module.css"

export default function GetStarted({
  quickStartRef,
  currentLanguage,
  getStarted,
  isV7,
}: {
  quickStartRef: any
  currentLanguage: string
  getStarted: any
  isV7: boolean
}) {
  const { state } = useStateMachine()
  const lightMode = state?.setting?.lightMode

  return (
    <>
      <h2 ref={quickStartRef}>{getStarted.install.linkTitle}</h2>
      <p>{getStarted.install.description}</p>

      <span
        className={`${styles.installCode} ${
          lightMode ? styles.lightInstallCode : ""
        }`}
      >
        npm install react-hook-form
        <button
          className={styles.copyButton}
          onClick={() => {
            copyClipBoard("npm install react-hook-form")
            alert(generic.copied[currentLanguage])
          }}
        >
          <span>
            <span />
          </span>{" "}
          {generic.copy[currentLanguage]}
        </button>
      </span>

      <h2
        style={{
          marginTop: 50,
        }}
      >
        {getStarted.example.title}
      </h2>
      <p>{getStarted.example.description}</p>
      <CodeArea
        canEdit
        rawData={isV7 ? code : codeV6}
        tsRawData={isV7 ? codeTs : codeTsV6}
        url={
          isV7
            ? "https://codesandbox.io/s/react-hook-form-get-started-j5wxo"
            : "https://codesandbox.io/s/kw7z2q2n15"
        }
        tsUrl={
          isV7
            ? "https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm"
            : "https://codesandbox.io/s/react-hook-form-get-started-ts-resrg"
        }
      />
    </>
  )
}

import React from "react"
import Button from "Components/Button"
import { connect } from "react-redux"
import { csvUpload } from "Actions"
import t from "../../utils/translate/translate"

class CSVUpload extends React.Component {
  generalError() {
    const { errors } = this.props
    if (errors && errors.length > 0) {
      const errorMsgs = errors.map((e, i) => {
        return <div key={i}>{t(e)}</div>
      })
      return <div className="error">{errorMsgs}</div>
    }
    return
  }

  render() {
    let fileLabel = t("Choose File")
    const { loading, file, pickFile } = this.props
    if (file) fileLabel = file.name
    return (
      <div className="csvUpload">
        <h1>{t("Upload CSV File")}</h1>
        <h3>{t("Add multiple leads for sale by uploading a CSV file.")}</h3>
        <div className="file-pick">
          <Button appStyle secondary label={fileLabel}>
            <input
              className="displaynone"
              type="file"
              accept=".csv"
              onChange={e => {
                if (loading) return false
                pickFile(e.target.files[0])
              }}
            />
          </Button>
        </div>
        <div className="submit">
          <Button
            appStyle
            loading={loading}
            onClick={() => {
              if (loading) return false
              this.props.submit()
            }}
            containerElement="label"
            label={t("Submit")}
          />
        </div>
        {this.generalError()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.csvUpload,
})

export default connect(
  mapStateToProps,
  {
    pickFile: csvUpload.csvUploadPickFile,
    submit: csvUpload.csvUploadSubmit,
  },
)(CSVUpload)

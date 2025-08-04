type ErrorMsgProps = { errorMsg: Record<string, string[]> };

const ErrorList = ({ errorMsg }: ErrorMsgProps) => (
  <ul>
    {Object.keys(errorMsg).map((errorType) => (
      <li key={errorType}>
        <strong>{errorType}</strong>
        <ul>
          {errorMsg[errorType].map((file) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

export default ErrorList;

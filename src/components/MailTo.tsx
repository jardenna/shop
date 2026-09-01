interface MailToProps {
  email: string;
}

const MailTo = ({ email }: MailToProps) => (
  <span>
    <a href={`mailto:${email}`}>{email}</a>
  </span>
);

export default MailTo;

import { EuiHeader, EuiHeaderLinks, EuiHeaderLink } from "@elastic/eui";

export const Header = () => {
  return (
    <EuiHeader position="fixed">
      <EuiHeaderLinks>
        <EuiHeaderLink href="/" isActive>
          Countries by Florent
        </EuiHeaderLink>
      </EuiHeaderLinks>
    </EuiHeader>
  );
};

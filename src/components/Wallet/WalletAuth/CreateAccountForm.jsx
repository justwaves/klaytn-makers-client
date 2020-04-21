import React, { useState } from "react";
import styled from "styled-components";
import caver from "klaytn/caver";
import { Copy } from "components/Common/Icons";
import Button from "components/Common/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const Views = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const Label = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.theme.color.green};
  margin-bottom: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.color.gray[5]};
  padding: 0.5rem 0;
  margin-bottom: 2rem;

  svg {
    fill: ${props => props.theme.color.gray[7]};
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.25rem;
    margin-right: 0.75rem;
  }
`;

const SigninInput = styled.input`
  flex: 1;
  border: 0;
  margin-right: 0.5rem;
  font-size: 0.875rem;

  &::placeholder {
    color: ${props => props.theme.color.gray[5]};
  }
`;

const AccessButton = styled(Button)`
  width: 100%;
  height: 3rem;
  background-color: ${props => props.theme.color.green};
  margin-bottom: 2rem;

  &:hover {
    background-color: #229b9b;
  }
`;

const CopyButton = styled.div``;
const CopyContainer = styled.span`
  cursor: pointer;
`;
const CreateAccountForm = () => {
  const [privateKey, setPrivateKey] = useState(null);

  const generatePrivateKey = () => {
    const { privateKey } = caver.klay.accounts.create();
    setPrivateKey(privateKey);
  };

  const theme = createMuiTheme({
    palette: {
      primary: { main: "#ffffff" },
      secondary: { main: "#17202E" },
    },
    typography: {
      fontSize: 18,
    },
  });

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Views>
        <Label>Please Save Your Klaytn Wallet Private Key</Label>
        <InputBox>
          <CopyButton>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <LightTooltip
                placement="right"
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied!"
              >
                <CopyToClipboard text={privateKey}>
                  <CopyContainer onClick={handleTooltipOpen}>
                    <Copy />
                  </CopyContainer>
                </CopyToClipboard>
              </LightTooltip>
            </ClickAwayListener>
          </CopyButton>
          <SigninInput
            placeholder="New Klaytn Private Key"
            value={privateKey || ""}
            readOnly
          />
        </InputBox>
        <AccessButton onClick={generatePrivateKey}>
          Generate Private Key
        </AccessButton>
      </Views>
    </ThemeProvider>
  );
};

export default CreateAccountForm;

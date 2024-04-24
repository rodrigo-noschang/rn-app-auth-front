const urlParams = new URLSearchParams(window.location.search);
const redirect_uri = urlParams.get('redirect_uri');
const client_id = urlParams.get('client_id');
const response_type = urlParams.get('response_type');
const state = urlParams.get('state');
const nonce = urlParams.get('nonce');
const code_challenge = urlParams.get('code_challenge');
const code_challenge_method = urlParams.get('code_challenge_method');

const IP_ADDRESS = '192.168.1.8';

console.log('urlParams -> ', urlParams);

const authBtn = document.querySelector('#consent-to-auth');
const cancelBtn = document.querySelector('#cancel-auth');

async function giveConsent() {
  const { code } = await fetch(`http://${IP_ADDRESS}:3033/auth/code?redirect_uri=${redirect_uri}&client_id=${client_id}&state=${state}`)
    .then(res => res.json());

  // &state=${state}&client_id=${client_id}&response_type=${response_type}&nonce=${nonce}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}
  window.location.href = `${redirect_uri}/?code=${code}&state=${state}`;
  // window.location.href = `https://com.opencyclingtracker://auth`;

}

function cancelConsent() {
  window.location.href = `${redirect_uri}`;
}

authBtn.addEventListener('click', giveConsent);
cancelBtn.addEventListener('click', cancelConsent);
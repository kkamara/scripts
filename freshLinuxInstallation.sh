
sudo apt-get update -y && sudo apt-get upgrade -y && sudo apt-get autoremove -y

sudo apt-get install -y vlc wget curl vim openssh-client openssh-server git exo-utils gedit 

echo "

export LAMPP=\"/opt/lampp\"
export XAMPP=\"$LAMPP\"
export HTDOCS=\"$LAMPP/htdocs\"

export WORKSPACE=\"$HOME/workspace\"
export JOBSPACE=\"$HOME/jobspace\"

export PATH=\"$PATH:$LAMPP/bin\"

alias hs=\"cd $HOME/Documents && tar cvzf storage.tar.gz storage && rm -rf storage && sudo mv storage.tar.gz /etc/storage\"
alias rs=\"cd $HOME/Documents && sudo mv /etc/storage $HOME/Documents && tar xvzf storage.tar.gz\"
alias py=\"python3.8\"
alias pip=\"python3.8 -m pip\"


" >> ~/.bash_profile


#!/bin/bash

# Script to change the last commit's author information
# Usage: ./change-commit-author.sh

echo "Changing last commit author to GRD-Daddi <matt@grdisro.com>..."

# Change the author of the last commit
git commit --amend --author="GRD-Daddi <matt@grdisro.com>" --no-edit

echo "✓ Last commit author changed successfully!"
echo "New commit info:"
git log -1 --pretty=format:"Author: %an <%ae>%nDate: %ad%nMessage: %s" --date=short
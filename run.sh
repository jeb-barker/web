#!/bin/sh

# comment

exec node index.js >> logs.out 2>&1

#
# then in terminal
# clear
# cd public
# cat mylog.out
# tail -f mylog.out
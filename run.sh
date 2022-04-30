go install github.com/mamezou-tech/sbgraph@latest

sbgraph init
sbgraph project -p iwsq
sbgraph fetch
sbgraph graph

sed -i "2d" _work/iwsq.dot

cat << 'EOS' | sed -i '1r /dev/stdin' _work/iwsq.dot
  concentrate = true
  splines = ortho
  layout = dot
  ranksep = 1.0
  nodesep = 1.0
EOS

dot _work/iwsq.dot -Tsvg -Kfdp -o iwsq.svg

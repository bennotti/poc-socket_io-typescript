$projectName=$args[0]
$ambiente=$args[1]
write-host "Parametros defaults, Sintaxe customizada: run-d.ps1 projectName debug|dev|tst|hml|prd" 
write-host "Parametros defaults, default: run-d.ps1 projectName debug" 

if ($projectName -eq $null) {
    $projectName = "poc"
}

if ($ambiente -eq $null) {
    $ambiente = "debug"
}

$dockerProjectName=$projectName + '_' + $ambiente
$dockerFileName='docker-comp-' + $ambiente + '.yml'

docker-compose -p $dockerProjectName -f ./$dockerFileName down
docker-compose -p $dockerProjectName -f ./$dockerFileName up --build -d
$projectName=$args[0]
$ambiente=$args[1]
write-host "Parametros defaults, Sintaxe customizada: stop.ps1 projectName debug|dev|tst|hml|prd" 
write-host "Parametros defaults, default: stop.ps1 projectName debug" 

if ($projectName -eq $null) {
    $projectName = "poc"
}

if ($ambiente -eq $null) {
    $ambiente = "debug"
}

$dockerProjectName=$projectName + '_' + $ambiente
$dockerFileName='docker-comp-' + $ambiente + '.yml'

docker-compose -p $dockerProjectName -f ./devops/$dockerFileName down
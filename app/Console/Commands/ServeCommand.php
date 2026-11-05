<?php

namespace App\Console\Commands;

use Illuminate\Foundation\Console\ServeCommand as BaseServeCommand;

class ServeCommand extends BaseServeCommand
{
    /**
     * The PHP configuration applied to the development server.
     *
     * @var array<string, string>
     */
    protected array $phpConfig = [
        'upload_max_filesize' => '16M',
        'post_max_size' => '20M',
        'memory_limit' => '512M',
    ];

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();

        // `php artisan serve` strips most environment variables on Windows,
        // including TEMP/TMP. Without a writable temp directory PHP cannot
        // store uploaded files, which makes every image upload fail.
        foreach (['TEMP', 'TMP'] as $key) {
            if (! isset($_ENV[$key])) {
                $value = getenv($key) ?: ($_SERVER[$key] ?? null);

                if (is_string($value) && $value !== '') {
                    $_ENV[$key] = $value;
                }
            }
        }

        static::$passthroughVariables = array_values(array_unique([
            ...static::$passthroughVariables,
            'TEMP',
            'TMP',
        ]));
    }

    /**
     * Get the full server command.
     *
     * @return array<int, string>
     */
    protected function serverCommand()
    {
        $command = parent::serverCommand();

        $config = [];

        foreach ($this->phpConfig as $key => $value) {
            $config[] = '-d';
            $config[] = "{$key}={$value}";
        }

        array_splice($command, 1, 0, $config);

        return $command;
    }
}
